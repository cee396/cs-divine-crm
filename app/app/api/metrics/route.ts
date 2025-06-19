
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'
import { prisma as db } from '@/lib/db'

export async function GET() {
  try {
    // Get total leads count
    const totalLeads = await db.lead.count()
    
    // Get new leads count
    const newLeads = await db.lead.count({
      where: { status: 'New Lead' }
    })
    
    // Get contacted leads count
    const contactedLeads = await db.lead.count({
      where: { status: 'Contacted' }
    })
    
    // Get qualified leads count
    const qualifiedLeads = await db.lead.count({
      where: { status: 'Qualified' }
    })
    
    // Get closed deals count
    const closedDeals = await db.lead.count({
      where: { status: 'Closed' }
    })
    
    // Calculate average response time (placeholder for now)
    const avgResponseTime = 2.5 // hours

    return NextResponse.json({
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      closedDeals,
      avgResponseTime
    })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}
