
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      totalProperties,
      totalLeads,
      totalCallLogs,
      recentImports,
      leadsByStatus,
      propertiesByCounty,
      upcomingAuctions,
      recentActivity
    ] = await Promise.all([
      prisma.property.count(),
      prisma.lead.count(),
      prisma.callLog.count(),
      prisma.csvImport.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      }),
      prisma.lead.groupBy({
        by: ['status'],
        _count: true
      }),
      prisma.property.groupBy({
        by: ['county'],
        _count: true
      }),
      prisma.property.findMany({
        where: {
          auctionDate: {
            gte: new Date(),
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Next 30 days
          }
        },
        orderBy: { auctionDate: 'asc' },
        take: 5,
        select: {
          id: true,
          address: true,
          city: true,
          county: true,
          auctionDate: true,
          minimumBid: true
        }
      }),
      prisma.callLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          lead: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          user: {
            select: {
              name: true
            }
          }
        }
      })
    ]);

    return NextResponse.json({
      totalProperties,
      totalLeads,
      totalCallLogs,
      recentImports,
      leadsByStatus,
      propertiesByCounty,
      upcomingAuctions,
      recentActivity
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
