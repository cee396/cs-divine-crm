
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma as db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const leadId = searchParams.get('leadId')

    // Build where clause
    const where: any = {}
    if (leadId) {
      where.leadId = leadId
    }

    // Get call logs with related data
    const callLogs = await db.callLog.findMany({
      where,
      orderBy: { callDate: 'desc' },
      take: limit ? parseInt(limit) : undefined,
      include: {
        lead: {
          select: {
            id: true,
            ownerName: true,
            propertyAddress: true,
            county: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      callLogs
    })
  } catch (error) {
    console.error('Error fetching call logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch call logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { leadId, userId, outcome, duration, notes, followUpDate } = body

    // Validate required fields
    if (!leadId || !userId || !outcome) {
      return NextResponse.json(
        { error: 'Missing required fields: leadId, userId, outcome' },
        { status: 400 }
      )
    }

    // Create call log
    const callLog = await db.callLog.create({
      data: {
        leadId,
        userId,
        outcome,
        duration: duration ? parseInt(duration) : null,
        notes: notes || null,
        followUpDate: followUpDate ? new Date(followUpDate) : null
      },
      include: {
        lead: {
          select: {
            id: true,
            ownerName: true,
            propertyAddress: true,
            county: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // Update lead contact info
    await db.lead.update({
      where: { id: leadId },
      data: {
        lastContactDate: new Date(),
        contactAttempts: {
          increment: 1
        },
        nextFollowUpDate: followUpDate ? new Date(followUpDate) : null
      }
    })

    return NextResponse.json({
      success: true,
      callLog
    })
  } catch (error) {
    console.error('Error creating call log:', error)
    return NextResponse.json(
      { error: 'Failed to create call log' },
      { status: 500 }
    )
  }
}
