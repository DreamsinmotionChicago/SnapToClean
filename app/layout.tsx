import './globals.css';
import type { Metadata } from 'next';
import { BRAND, COPY, SERVICE_AREAS } from '@/lib/config';
import Analytics from '@/components/Analytics';
import StickyCTA from '@/components/StickyCTA';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: `Junk Removal Chicago (60617) — Basement & Garage Cleanouts | ${BRAND.name}`,
  description: 'Upfront, volume-based pricing. Same-day Chicago cleanouts. Text photos for a fast quote.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BRAND.name,
    "telephone": BRAND.phone,
    "email": BRAND.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": BRAND.hqZip,
      "addressCountry": "US"
    },
    "areaServed": SERVICE_AREAS.map(a => ({ "@type": "City", "name": a }))
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen text-[#04384a]">
        <Analytics />
        <StickyCTA />
        <Header />
        <main className="container mx-auto max-w-5xl px-4 py-10 md:py-16">{children}</main>
        <footer className="mt-16 border-t-4 border-white/40 bg-[#04384a] text-white">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                <div className="comic-panel inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-white">
                  <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-[#83f2c5]" aria-hidden />
                  Trusted Chicago Junk Removal
                </div>
                <div className="comic-panel rounded-[24px] bg-white/5 px-5 py-4 text-sm font-semibold text-white">
                  <div className="text-2xl font-extrabold uppercase">{BRAND.name}</div>
                  <p className="mt-2 max-w-lg text-xs uppercase text-white/70">Licensed & insured crews serving the city, suburbs, and Northwest Indiana. We donate and recycle whenever possible.</p>
                </div>
                <div className="grid gap-4 text-sm font-semibold uppercase text-white sm:grid-cols-2">
                  <div className="comic-panel rounded-[24px] bg-white/5 px-5 py-4">
                    <div>Talk to a specialist</div>
                    <div className="mt-1">Call <a className="underline decoration-4 decoration-[#83f2c5]" href={`tel:${BRAND.phone}`}>{BRAND.phone}</a></div>
                    <div>Text <a className="underline decoration-4 decoration-[#83f2c5]" href={`sms:${BRAND.sms}`}>{BRAND.sms}</a></div>
                  </div>
                  <div className="comic-panel rounded-[24px] bg-white/5 px-5 py-4">
                    <div>Service area</div>
                    <p className="mt-1 text-xs uppercase text-white/70">{SERVICE_AREAS.slice(0, 6).join(', ')} & beyond</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="comic-panel rounded-[24px] bg-white/5 px-5 py-4 text-sm font-semibold uppercase text-white">
                  <div className="text-xs text-[#83f2c5]">Why neighbors cheer for us</div>
                  <ul className="mt-3 space-y-2 text-xs text-white">
                    <li className="flex items-start gap-2"><span className="text-[#83f2c5]">✓</span> {COPY.trustBadges[0]}</li>
                    <li className="flex items-start gap-2"><span className="text-[#83f2c5]">✓</span> {COPY.trustBadges[1]}</li>
                    <li className="flex items-start gap-2"><span className="text-[#83f2c5]">✓</span> {COPY.trustBadges[2]}</li>
                    <li className="flex items-start gap-2"><span className="text-[#83f2c5]">✓</span> Discounts for curbside pickups</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t-4 border-white/30 pt-6 text-xs font-extrabold uppercase text-white/80">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
