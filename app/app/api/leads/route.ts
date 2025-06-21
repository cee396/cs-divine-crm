
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma as db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    // Build where clause
    const where: any = {}
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { ownerName: { contains: search, mode: 'insensitive' } },
        { propertyAddress: { contains: search, mode: 'insensitive' } },
        { county: { contains: search, mode: 'insensitive' } },
        { ownerEmail: { contains: search, mode: 'insensitive' } },
        { ownerPhone: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Build order by clause
    let orderBy: any = { createdAt: 'desc' }
    if (sort === 'recent') {
      orderBy = { createdAt: 'desc' }
    } else if (sort === 'name') {
      orderBy = { ownerName: 'asc' }
    } else if (sort === 'status') {
      orderBy = { status: 'asc' }
    }

    // Get total count for pagination
    const totalCount = await db.lead.count({ where })

    // Get leads with pagination
    const leads = await db.lead.findMany({
      where,
      orderBy,
      skip: limit ? 0 : (page - 1) * pageSize,
      take: limit ? parseInt(limit) : pageSize,
      select: {
        id: true,
        ownerName: true,
        propertyAddress: true,
        propertyCity: true,
        propertyState: true,
        propertyZip: true,
        county: true,
        status: true,
        taxesOwed: true,
        ownerPhone: true,
        ownerEmail: true,
        createdAt: true,
        updatedAt: true,
        priority: true,
        contactAttempts: true,
        lastContactDate: true,
        nextFollowUpDate: true,
        assessedValue: true,
        marketValue: true,
        yearsDelinquent: true
      }
    })

    return NextResponse.json({
      leads,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize)
      }
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
