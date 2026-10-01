import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, projectType, city, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const inquiry = await db.inquiry.create({
      data: {
        name: String(name).trim(),
        phone: String(phone).trim(),
        projectType: String(projectType || 'Residential').trim(),
        city: String(city || '').trim(),
        notes: notes ? String(notes).trim() : null,
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error('Failed to create inquiry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Failed to fetch inquiries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
