'use client';
import Image from 'next/image';
import { BRAND } from '@/lib/config';

export default function StickyCTA() {
  const smsHref = `sms:${BRAND.sms}?&body=${encodeURIComponent('Hi Snap To Clean — sending photos for a quote!')}`;
  const callHref = `tel:${BRAND.phone}`;
  const scrollToForm = () => {
    const el = document.getElementById('estimate-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className="sticky-cta">
      <div className="container mx-auto">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-[#04384a]">
            <div className="comic-panel relative flex h-14 w-32 items-center justify-center rounded-[18px] bg-white p-1">
              <Image src="/brand/logo-alt.png" alt={`${BRAND.name} logo`} fill sizes="128px" style={{ objectFit: 'contain' }} />
            </div>
            <div className="font-bold uppercase">
              <div className="text-sm">{BRAND.name}</div>
              <div className="text-xs text-[#04384a]/80">Zap junk fast • Friendly crew</div>
            </div>
          </div>
          <div className="flex gap-2 md:gap-3">
            <a href={smsHref} className="btn btn-ghost flex-1">Text The Crew</a>
            <a href={callHref} className="btn btn-ghost flex-1">Call For Backup</a>
            <button onClick={scrollToForm} className="btn btn-primary flex-1">Smash That Estimate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
