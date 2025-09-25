import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const files = form.getAll('files') as File[];
    if (!files || !files.length) return NextResponse.json({ urls: [] });

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];
    let count = 0;
    for (const file of files) {
      if (count >= 8) break;
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 10 * 1024 * 1024) continue; // 10MB limit
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = (file.type.split('/')[1] || 'jpg').replace('jpeg','jpg');
      const name = `photo_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const dest = path.join(uploadDir, name);
      await fs.writeFile(dest, buffer);
      urls.push(`/uploads/${name}`);
      count++;
    }
    return NextResponse.json({ urls });
  } catch (e:any) {
    console.error(e);
    return NextResponse.json({ error: 'Upload error' }, { status: 500 });
  }
}
