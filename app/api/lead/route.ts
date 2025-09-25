import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { estimateRange } from '@/lib/pricing';
import { BRAND } from '@/lib/config';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const estimate = estimateRange({
      truckFraction: body?.volume?.truck_fraction || 0.25,
      addOns: body?.addOns || {},
      access: {
        curbside: body?.flags?.access?.curbside || false,
        longCarry: body?.flags?.access?.longCarry || false,
        stairsFlights: body?.flags?.access?.stairs ? (body?.flags?.access?.stairsFlights || 0) : 0
      }
    });

    const record = {
      ts: new Date().toISOString(),
      ...body,
      estimate
    };

    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, 'latest-lead.json'), JSON.stringify(record, null, 2));
    await fs.appendFile(path.join(dataDir, 'leads.jsonl'), JSON.stringify(record) + '\n');

    return NextResponse.json({ ok: true, estimate, bookingLink: BRAND.bookingLink || null });
  } catch (e:any) {
    console.error(e);
    return NextResponse.json({ error: 'Lead error' }, { status: 500 });
  }
}
