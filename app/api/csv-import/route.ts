
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { parseCSV, mapRowToLead, validateLead } from '@/lib/csv-parser';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    const user = verifyToken(token || '');
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const csvContent = await file.text();
    const rows = parseCSV(csvContent);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No valid data found in CSV' }, { status: 400 });
    }

    // Create CSV import record
    const csvImport = await prisma.csvImport.create({
      data: {
        fileName: file.name,
        userId: user.id,
        totalRows: rows.length,
        successRows: 0,
        errorRows: 0,
        status: 'processing'
      }
    });

    const errors: string[] = [];
    let successCount = 0;
    let errorCount = 0;

    // Process each row
    for (let i = 0; i < rows.length; i++) {
      try {
        const row = rows[i];
        const lead = mapRowToLead(row);

        if (!lead) {
          errors.push(`Row ${i + 2}: Could not map data to lead format`);
          errorCount++;
          continue;
        }

        const validationErrors = validateLead(lead);
        if (validationErrors.length > 0) {
          errors.push(`Row ${i + 2}: ${validationErrors.join(', ')}`);
          errorCount++;
          continue;
        }

        // Check for duplicate
        const existing = await prisma.lead.findFirst({
          where: {
            firstName: lead.firstName,
            lastName: lead.lastName,
            phone: lead.phone || undefined,
          }
        });

        if (existing) {
          errors.push(`Row ${i + 2}: Duplicate lead found (${lead.firstName} ${lead.lastName})`);
          errorCount++;
          continue;
        }

        // Create lead
        await prisma.lead.create({
          data: {
            firstName: lead.firstName,
            lastName: lead.lastName,
            email: lead.email,
            phone: lead.phone,
            address: lead.address,
            city: lead.city,
            state: lead.state,
            zipCode: lead.zipCode,
            notes: lead.notes,
            source: 'csv_import',
          }
        });

        successCount++;
      } catch (error) {
        console.error(`Error processing row ${i + 2}:`, error);
        errors.push(`Row ${i + 2}: Processing error`);
        errorCount++;
      }
    }

    // Update CSV import record
    await prisma.csvImport.update({
      where: { id: csvImport.id },
      data: {
        successRows: successCount,
        errorRows: errorCount,
        errors: JSON.stringify(errors),
        status: 'completed'
      }
    });

    return NextResponse.json({
      success: true,
      importId: csvImport.id,
      totalRows: rows.length,
      successRows: successCount,
      errorRows: errorCount,
      errors: errors.slice(0, 10) // Return first 10 errors
    });

  } catch (error) {
    console.error('CSV import error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
