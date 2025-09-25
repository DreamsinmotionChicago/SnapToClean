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
    <header className="bg-[#c8e6c9] text-[#04384a] shadow-xl">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="space-y-6">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-4 text-center lg:hidden">
            <div className="space-y-4 text-center">
              <div className="text-3xl font-bold uppercase tracking-wide text-white">{BRAND.name}</div>
              <div className="flex justify-center">
                <Image src="/brand/hero-image.png" alt="Snap To Clean hero" width={300} height={150} className="rounded-lg" />
              </div>
              <div className="text-lg font-semibold uppercase text-white/90">Chicago junk removal heroes on call</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase text-[#04384a]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 border-2 border-[#04384a]">
                <span>📍</span>
                Chicagoland + Suburbs
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 border-2 border-[#04384a]">
                <span>💥</span>
                Same-day cleanout crew
              </span>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold uppercase tracking-wide text-white">{BRAND.name}</div>
              <div className="text-2xl font-semibold uppercase text-white/90 mt-2">Chicago junk removal heroes on call</div>
            </div>

            <div className="grid grid-cols-2 gap-6 items-start">
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                  <div className="h-[400px]">
                    <Image src="/brand/hero-image.png" alt="Snap To Clean hero" width={500} height={400} className="rounded-lg object-cover h-full w-auto" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase text-[#04384a]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 border-2 border-[#04384a]">
                    <span>📍</span>
                    Chicagoland + Suburbs
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 border-2 border-[#04384a]">
                    <span>💥</span>
                    Same-day cleanout crew
                  </span>
                </div>
              </div>

              <div className="rounded-[28px] bg-white/95 p-6 border-2 border-[#04384a] h-[400px] flex flex-col justify-between w-full">
                <div className="space-y-4">
                  <div className="text-xl font-bold uppercase tracking-wide text-[#04384a]">Talk to a junk specialist</div>
                  <div className="text-4xl font-bold text-[#4caf50]">{BRAND.phone}</div>
                  <p className="text-lg font-semibold text-[#04384a]">Fast estimates • Same-day service • Licensed & insured</p>
                </div>
                <div className="flex flex-col gap-4">
                  {primaryCtas.map(({ href, label, style }) => (
                    <a key={label} href={href} className={`btn ${style} w-full text-center text-lg py-4 px-6`}>
                      {label}
                    </a>
                  ))}
                  <div className="rounded-[18px] border-2 border-[#04384a] bg-[#b6ff7a] px-6 py-4 text-base font-bold uppercase text-[#04384a] text-center">
                    ⏱️ Service hours: Mon–Sat 7a–7p • Sun 9a–4p
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional content for mobile */}
          <div className="lg:hidden">
            <div className="grid gap-6 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide border-2 border-[#04384a]">
                  <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-[#4caf50]" aria-hidden />
                  Snap To Clean • Chicago junk removal experts • Since 2013
                </div>
                <div>
                  <h1 className="comic-outline text-4xl font-bold">{COPY.heroTitle}</h1>
                  <p className="mt-3 max-w-xl text-base font-semibold text-[#04384a]">
                    {COPY.heroSub} The Snap To Clean squad swoops in with pro trucks, friendly faces, and donation-first hauling.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-[#04384a]">
                  {COPY.trustBadges.map((badge) => (
                    <div key={badge} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border-2 border-[#04384a]">
                      <span className="text-[#4caf50]">★</span>
                      <span>{badge}</span>
                    </div>
                  ))}
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border-2 border-[#04384a]">
                    <span>⭐️</span>
                    <span>500+ Chicago reviews</span>
                  </div>
                </div>
              </div>
              <div className="self-start rounded-[28px] bg-white/95 p-6 border-2 border-[#04384a]">
                <div className="text-sm font-bold uppercase tracking-wide text-[#04384a]">Talk to a junk specialist</div>
                <div className="mt-2 text-2xl font-bold text-[#4caf50]">{BRAND.phone}</div>
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
      </div>
    </header>
  );
}
