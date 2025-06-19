
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma as db } from '@/lib/db'
import { parseCSVValue, parseCSVNumber, parseCSVDate } from '@/lib/utils'

// Field mapping for common CSV column names to our database fields
const FIELD_MAPPING: Record<string, string> = {
  // Property Information
  'parcel_id': 'parcelId',
  'parcel_number': 'parcelId',
  'parcel': 'parcelId',
  'property_address': 'propertyAddress',
  'address': 'propertyAddress',
  'property_city': 'propertyCity',
  'city': 'propertyCity',
  'property_state': 'propertyState',
  'state': 'propertyState',
  'property_zip': 'propertyZip',
  'zip': 'propertyZip',
  'zipcode': 'propertyZip',
  'county': 'county',
  'property_type': 'propertyType',
  'land_use': 'landUse',
  'acres': 'acres',
  'square_feet': 'squareFeet',
  'year_built': 'yearBuilt',
  'bedrooms': 'bedrooms',
  'bathrooms': 'bathrooms',
  
  // Owner Information
  'owner_name': 'ownerName',
  'owner': 'ownerName',
  'owner_address': 'ownerAddress',
  'owner_city': 'ownerCity',
  'owner_state': 'ownerState',
  'owner_zip': 'ownerZip',
  'owner_phone': 'ownerPhone',
  'phone': 'ownerPhone',
  'owner_email': 'ownerEmail',
  'email': 'ownerEmail',
  'mailing_address': 'mailingAddress',
  'mailing_city': 'mailingCity',
  'mailing_state': 'mailingState',
  'mailing_zip': 'mailingZip',
  
  // Tax Information
  'taxes_owed': 'taxesOwed',
  'amount_owed': 'taxesOwed',
  'tax_amount': 'taxesOwed',
  'years_delinquent': 'yearsDelinquent',
  'sale_date': 'saleDate',
  'certificate_number': 'certificateNumber',
  'bid_amount': 'bidAmount',
  'redemption_amount': 'redemptionAmount',
  'interest_rate': 'interestRate',
  
  // Assessment Information
  'assessed_value': 'assessedValue',
  'market_value': 'marketValue',
  'land_value': 'landValue',
  'building_value': 'buildingValue',
  'exemptions': 'exemptions',
  
  // Geographic Information
  'latitude': 'latitude',
  'longitude': 'longitude',
  'subdivision': 'subdivision',
  'section': 'section',
  'township': 'township',
  'range': 'range',
  
  // FL Counties Specific
  'deed_book': 'deedBook',
  'deed_page': 'deedPage',
  'plat_book': 'platBook',
  'plat_page': 'platPage',
  'legal_description': 'legalDescription',
  'zoning': 'zoning',
  'flood_zone': 'floodZone',
  'school_district': 'schoolDistrict'
}

function normalizeColumnName(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  let i = 0
  
  while (i < line.length) {
    const char = line[i]
    const nextChar = line[i + 1]
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"'
        i += 2
        continue
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
    
    i++
  }
  
  result.push(current)
  return result
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!file.name.endsWith('.csv')) {
      return NextResponse.json(
        { success: false, error: 'Only CSV files are supported' },
        { status: 400 }
      )
    }

    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      return NextResponse.json(
        { success: false, error: 'CSV file must contain at least a header and one data row' },
        { status: 400 }
      )
    }

    // Parse header
    const headerLine = lines[0]
    const headers = parseCSVLine(headerLine).map(h => h.trim())
    
    // Create column mapping
    const columnMapping: Record<number, string> = {}
    let extraFieldIndex = 1
    
    headers.forEach((header, index) => {
      const normalizedHeader = normalizeColumnName(header)
      const mappedField = FIELD_MAPPING[normalizedHeader]
      
      if (mappedField) {
        columnMapping[index] = mappedField
      } else if (header.trim()) {
        // Map to extra fields (field1, field2, etc.)
        columnMapping[index] = `field${extraFieldIndex}`
        extraFieldIndex++
      }
    })

    const totalRecords = lines.length - 1
    let successRecords = 0
    let errorRecords = 0
    const errors: string[] = []

    // Create upload session
    const uploadSession = await db.uploadSession.create({
      data: {
        filename: file.name,
        totalRecords,
        successRecords: 0,
        errorRecords: 0,
        status: 'Processing'
      }
    })

    // Process data rows
    for (let i = 1; i < lines.length; i++) {
      try {
        const dataLine = lines[i]
        const values = parseCSVLine(dataLine)
        
        // Create lead data object
        const leadData: any = {
          status: 'New Lead' // All leads default to "New Lead"
        }

        // Map values to database fields
        values.forEach((value, index) => {
          const fieldName = columnMapping[index]
          if (fieldName && value?.trim()) {
            const cleanValue = value.trim()
            
            // Handle different data types
            if (['taxesOwed', 'assessedValue', 'marketValue', 'landValue', 'buildingValue', 
                 'exemptions', 'bidAmount', 'redemptionAmount', 'interestRate', 'acres', 
                 'squareFeet', 'estimatedValue', 'repairCosts', 'marketRent', 'propertyTaxes', 
                 'insurance', 'hoa', 'latitude', 'longitude', 'bathrooms'].includes(fieldName)) {
              leadData[fieldName] = parseCSVNumber(cleanValue)
            } else if (['yearBuilt', 'bedrooms', 'yearsDelinquent', 'contactAttempts'].includes(fieldName)) {
              const num = parseCSVNumber(cleanValue)
              leadData[fieldName] = num ? Math.floor(num) : null
            } else if (fieldName === 'saleDate') {
              leadData[fieldName] = parseCSVDate(cleanValue)
            } else {
              leadData[fieldName] = parseCSVValue(cleanValue)
            }
          }
        })

        // Skip if no meaningful data
        if (!leadData.parcelId && !leadData.propertyAddress && !leadData.ownerName) {
          errorRecords++
          errors.push(`Row ${i + 1}: Missing required data (parcel ID, property address, or owner name)`)
          continue
        }

        // Check for duplicate parcel ID
        if (leadData.parcelId) {
          const existing = await db.lead.findFirst({
            where: { parcelId: leadData.parcelId }
          })
          
          if (existing) {
            errorRecords++
            errors.push(`Row ${i + 1}: Duplicate parcel ID ${leadData.parcelId}`)
            continue
          }
        }

        // Create the lead
        await db.lead.create({
          data: leadData
        })
        
        successRecords++
      } catch (error) {
        errorRecords++
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        console.error(`Error processing row ${i + 1}:`, error)
      }
    }

    // Update upload session
    await db.uploadSession.update({
      where: { id: uploadSession.id },
      data: {
        successRecords,
        errorRecords,
        status: 'Completed',
        completedAt: new Date(),
        errors: JSON.stringify(errors)
      }
    })

    return NextResponse.json({
      success: true,
      totalRecords,
      successRecords,
      errorRecords,
      errors: errors.slice(0, 10), // Return first 10 errors
      uploadSessionId: uploadSession.id
    })

  } catch (error) {
    console.error('CSV upload error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred during upload'
      },
      { status: 500 }
    )
  }
}
