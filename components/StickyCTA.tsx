'use client';
import { useState } from 'react';
import Image from 'next/image';
import { BRAND } from '@/lib/config';

export default function StickyCTA() {
  const [showDropdown, setShowDropdown] = useState(false);
  const smsHref = `sms:${BRAND.sms}?&body=${encodeURIComponent('Hi Snap To Clean — sending photos for a quote!')}`;
  const callHref = `tel:${BRAND.phone}`;
  const scrollToForm = () => {
    const el = document.getElementById('estimate-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className="sticky-cta">
      <div className="container mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[20px] bg-transparent p-2">
            <Image src="/brand/logo-green.png" alt={`${BRAND.name} logo`} fill sizes="80px" style={{ objectFit: 'contain' }} />
          </div>
          <div className="relative flex-1">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="btn btn-ghost w-full text-xs px-3 py-2 flex items-center justify-center gap-1"
            >
              CALL/TEXT FOR THE CREW
              <span className="text-xs">▼</span>
            </button>
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#04384a] rounded-lg shadow-lg z-50">
                <a href={callHref} className="block px-3 py-2 text-xs font-bold text-[#04384a] hover:bg-[#0fa3b1]/10 border-b border-[#04384a]/20">
                  📞 CALL NOW
                </a>
                <a href={smsHref} className="block px-3 py-2 text-xs font-bold text-[#04384a] hover:bg-[#0fa3b1]/10">
                  💬 TEXT US
                </a>
              </div>
            )}
          </div>
          <button onClick={scrollToForm} className="btn btn-primary flex-1 text-xs px-3 py-2">Smash That Estimate</button>
        </div>
      </div>
    </div>
  );
}
