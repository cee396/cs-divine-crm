
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
  'apn': 'parcelId',
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
  'property_county': 'county',
  'property_type': 'propertyType',
  'land_use': 'landUse',
  'acres': 'acres',
  'land_acreage': 'acres',
  'square_feet': 'squareFeet',
  'land_square_footage': 'squareFeet',
  'square_footage': 'squareFeet',
  'year_built': 'yearBuilt',
  'bedrooms': 'bedrooms',
  'bathrooms': 'bathrooms',
  
  // Owner Information - FL Counties specific
  'first_name': 'firstName',
  'last_name': 'lastName',
  'owner_1_full_name': 'ownerName',
  'owner_2_full_name': 'field1',
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
  'tax_assessed_value': 'assessedValue',
  'years_delinquent': 'yearsDelinquent',
  'sale_date': 'saleDate',
  'last_market_sale_date': 'saleDate',
  'certificate_number': 'certificateNumber',
  'bid_amount': 'bidAmount',
  'last_market_sale_price': 'bidAmount',
  'redemption_amount': 'redemptionAmount',
  'interest_rate': 'interestRate',
  'mortgage_interest_rate': 'interestRate',
  
  // Assessment Information
  'assessed_value': 'assessedValue',
  'market_value': 'marketValue',
  'total_value': 'marketValue',
  'land_value': 'landValue',
  'building_value': 'buildingValue',
  'improvement_value': 'buildingValue',
  'exemptions': 'exemptions',
  'kind_estimate': 'estimatedValue',
  
  // Geographic Information
  'latitude': 'latitude',
  'longitude': 'longitude',
  'subdivision': 'subdivision',
  'subdivision_name': 'subdivision',
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
  'school_district': 'schoolDistrict',
  
  // Phone numbers - FL Counties has many phone fields
  'owner_mobile_1': 'ownerPhone',
  'owner_landline_1': 'ownerPhone',
  'owner_voip_1': 'ownerPhone',
  
  // Additional FL Counties fields - map to extra fields since they don't exist in schema
  'motivation_score': 'field2',
  'equity': 'field3',
  'equity_$': 'field4',
  'years_of_ownership': 'field5',
  'owner_occupied_status': 'field6',
  'potential_absentee': 'field7',
  'potential_inherited': 'field8',
  'potential_deceased': 'field9',
  'potential_divorced': 'field10',
  'foreclosure_stage': 'field11',
  'vacant_indicator': 'field12',
  'financial_distressed': 'field13'
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
    // Remove BOM if present
    const cleanText = text.replace(/^\uFEFF/, '')
    const lines = cleanText.split('\n').filter(line => line.trim())
    
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
      } else if (header.trim() && extraFieldIndex <= 100) {
        // Map to extra fields (field1, field2, etc.) - limit to field100
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

        // Store temporary values for combining fields
        const tempData: any = {}
        
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
            } else if (fieldName === 'firstName' || fieldName === 'lastName') {
              // Store first/last names temporarily to combine later
              tempData[fieldName] = parseCSVValue(cleanValue)
            } else {
              leadData[fieldName] = parseCSVValue(cleanValue)
            }
          }
        })
        
        // Combine First Name and Last Name into ownerName if not already set
        if (!leadData.ownerName && (tempData.firstName || tempData.lastName)) {
          const firstName = tempData.firstName || ''
          const lastName = tempData.lastName || ''
          leadData.ownerName = `${firstName} ${lastName}`.trim()
        }
        
        // If we have phone numbers from multiple fields, prioritize mobile over landline
        if (!leadData.ownerPhone) {
          // Look for any phone number in the data
          for (const [key, value] of Object.entries(leadData)) {
            if (key.includes('phone') || key.includes('mobile') || key.includes('landline')) {
              if (value && typeof value === 'string' && value.trim()) {
                leadData.ownerPhone = value.trim()
                break
              }
            }
          }
        }

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
