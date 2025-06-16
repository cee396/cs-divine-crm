
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    const user = verifyToken(token || '');
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const callLog = await prisma.callLog.create({
      data: {
        leadId: data.leadId,
        userId: user.id,
        callType: data.callType,
        duration: data.duration || null,
        outcome: data.outcome,
        notes: data.notes || null,
        followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
      },
      include: {
        user: {
          select: { name: true }
        }
      }
    });

    // Update lead's last contact date and status if needed
    const updateData: any = {
      lastContactDate: new Date(),
    };

    if (data.updateLeadStatus) {
      updateData.status = data.leadStatus;
    }

    if (data.followUpDate) {
      updateData.nextFollowUp = new Date(data.followUpDate);
    }

    await prisma.lead.update({
      where: { id: data.leadId },
      data: updateData
    });

    return NextResponse.json(callLog);
  } catch (error) {
    console.error('Call log creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
