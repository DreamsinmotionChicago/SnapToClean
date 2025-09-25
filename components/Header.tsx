import Image from 'next/image';
import { BRAND, COPY } from '@/lib/config';

const primaryCtas = [
  {
    label: 'Call Snap To Clean!',
    href: `tel:${BRAND.phone}`,
    style: 'btn-primary'
  },
  {
    label: 'Text Your Junk Pics',
    href: `sms:${BRAND.sms}?&body=${encodeURIComponent('Hi Snap To Clean — here are photos for a quote!')}`,
    style: 'btn-ghost'
  }
];

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#04384a] via-[#0fa3b1] to-[#2ec4b6] text-[#04384a] shadow-xl">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="comic-panel relative flex h-20 w-48 items-center justify-center rounded-[24px] bg-white/95 p-2">
                <Image src="/brand/logo-alt.png" alt={`${BRAND.name} logo`} fill sizes="192px" style={{ objectFit: 'contain' }} priority />
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold uppercase tracking-wide text-[#04384a]">{BRAND.name}</div>
                <div className="text-xs font-semibold uppercase text-[#04384a]/80">Chicago junk removal heroes on call</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase text-[#04384a]">
              <span className="comic-panel inline-flex items-center gap-2 rounded-full bg-white px-3 py-2">
                <span>📍</span>
                Chicagoland + Suburbs
              </span>
              <span className="comic-panel inline-flex items-center gap-2 rounded-full bg-white px-3 py-2">
                <span>💥</span>
                Same-day cleanout crew
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-center">
            <div className="space-y-4">
              <div className="comic-panel inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide">
                <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-[#0fa3b1]" aria-hidden />
                Snap To Clean • Chicago junk removal experts • Since 2013
              </div>
              <div>
                <div className="comic-burst text-sm">Bam! Clutter Be Gone!</div>
                <h1 className="comic-outline mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">{COPY.heroTitle}</h1>
                <p className="mt-3 max-w-xl text-base font-semibold text-[#04384a] sm:text-lg">
                  {COPY.heroSub} The Snap To Clean squad swoops in with pro trucks, friendly faces, and donation-first hauling.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-semibold text-[#04384a]">
                {COPY.trustBadges.map((badge) => (
                  <div key={badge} className="comic-panel inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                    <span className="text-[#0fa3b1]">★</span>
                    <span>{badge}</span>
                  </div>
                ))}
                <div className="comic-panel inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                  <span>⭐️</span>
                  <span>500+ Chicago reviews</span>
                </div>
              </div>
            </div>
            <div className="comic-panel self-start rounded-[28px] bg-white/95 p-6">
              <div className="text-sm font-bold uppercase tracking-wide text-[#04384a]">Talk to a junk specialist</div>
              <div className="mt-2 text-2xl font-bold text-[#0fa3b1]">{BRAND.phone}</div>
              <p className="mt-2 text-sm font-semibold text-[#04384a]">Fast estimates • Same-day service • Licensed & insured</p>
              <div className="mt-4 flex flex-col gap-2">
                {primaryCtas.map(({ href, label, style }) => (
                  <a key={label} href={href} className={`btn ${style} w-full text-center`}>
                    {label}
                  </a>
                ))}
              </div>
              <div className="mt-4 rounded-[18px] border-2 border-[#04384a] bg-[#b6ff7a] px-4 py-3 text-xs font-bold uppercase text-[#04384a]">
                ⏱️ Service hours: Mon–Sat 7a–7p • Sun 9a–4p
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
