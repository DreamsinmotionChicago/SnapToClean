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
      <div className="container mx-auto px-3">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative flex h-20 w-20 md:h-32 md:w-32 flex-shrink-0 items-center justify-center rounded-[20px] bg-transparent p-2">
            <Image src="/brand/logo-green.png" alt={`${BRAND.name} logo`} fill sizes="(max-width: 768px) 80px, 128px" style={{ objectFit: 'contain' }} />
          </div>
          <div className="relative flex-1 min-w-0">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="btn btn-ghost w-full text-xs px-2 md:px-3 py-2 flex items-center justify-center gap-1"
            >
              <span className="truncate">CALL/TEXT FOR THE CREW</span>
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
          <button onClick={scrollToForm} className="btn btn-primary text-xs px-2 md:px-3 py-2 flex-shrink-0">
            <span className="hidden sm:inline">Smash That Estimate</span>
            <span className="sm:hidden">Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
