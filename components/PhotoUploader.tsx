'use client';
import React, { useState } from 'react';
import { compressImage, convertHeicToJpeg, isHeic } from '@/lib/image';

type Props = {
  onChange: (files: File[]) => void;
  maxFiles?: number;
};

export default function PhotoUploader({ onChange, maxFiles = 8 }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;
    setBusy(true);
    setError(null);
    const files = Array.from(fileList).slice(0, maxFiles);
    const out: File[] = [];
    const previewsLocal: string[] = [];
    for (const f of files) {
      try {
        let file = f;
        if (isHeic(file)) {
          file = await convertHeicToJpeg(file);
        }
        file = await compressImage(file);
        out.push(file);
        previewsLocal.push(URL.createObjectURL(file));
      } catch (e) {
        console.error(e);
        setError('Some images could not be processed. Try again.');
      }
    }
    setPreviews(previewsLocal);
    setBusy(false);
    onChange(out);
  };

  return (
    <div>
      <label className="label-comic mb-1">Photos (up to {maxFiles})</label>
      <input
        type="file"
        accept="image/*,.heic,.heif"
        capture="environment"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="block w-full rounded-[18px] border-[3px] border-[#04384a] bg-white px-4 py-3 text-sm font-semibold uppercase text-[#04384a] shadow-[4px_4px_0_rgba(4,56,74,0.15)] file:mr-3 file:rounded-[12px] file:border-2 file:border-[#04384a] file:bg-[#83f2c5] file:px-4 file:py-2 file:font-bold file:uppercase file:text-[#04384a] hover:file:bg-[#2ec4b6]/90"
      />
      {busy ? <p className="mt-2 text-xs font-bold uppercase text-[#04384a]/70">Processing photos…</p> : null}
      {error ? <p className="mt-2 text-xs font-bold uppercase text-[#0fa3b1]">{error}</p> : null}
      {previews.length ? (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {previews.map((src, i) => (
            <div key={i} className="comic-panel aspect-square overflow-hidden rounded-2xl bg-white">
              <img src={src} alt={`photo ${i+1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      ) : null}
      <p className="mt-1 text-xs font-semibold uppercase text-[#04384a]/70">We convert HEIC/HEIF to JPEG and compress images on your device for faster upload.</p>
    </div>
  );
}
