'use client';

import { useMemo, useState } from 'react';
import { BRAND, SERVICE_AREAS } from '@/lib/config';

type CoverageRegion = {
  label: string;
  zips: string[];
  neighborhoods: string[];
  mapQuery: string;
};

const COVERAGE_REGIONS: CoverageRegion[] = [
  {
    label: 'Downtown & Near North',
    zips: ['60601', '60602', '60603', '60604', '60606', '60610', '60611', '60654'],
    neighborhoods: ['The Loop', 'Millennium Park', 'Streeterville', 'River North', 'Gold Coast', 'Old Town', 'South Loop'],
    mapQuery: 'The Loop Chicago IL'
  },
  {
    label: 'West Loop & West Town',
    zips: ['60607', '60612', '60622', '60661'],
    neighborhoods: ['West Loop', 'Fulton Market', 'Greektown', 'Wicker Park', 'Ukrainian Village', 'Humboldt Park'],
    mapQuery: 'West Loop Chicago IL'
  },
  {
    label: 'North Side & Lakefront',
    zips: ['60613', '60614', '60640', '60657', '60626', '60645', '60660'],
    neighborhoods: ['Lincoln Park', 'Lakeview', 'Wrigleyville', 'Uptown', 'Edgewater', 'Rogers Park', 'West Ridge'],
    mapQuery: 'Lincoln Park Chicago IL'
  },
  {
    label: 'Northwest Side',
    zips: ['60618', '60630', '60631', '60641', '60646', '60656'],
    neighborhoods: ['Avondale', 'Irving Park', 'Portage Park', 'Jefferson Park', 'Norwood Park', 'Edison Park'],
    mapQuery: 'Portage Park Chicago IL'
  },
  {
    label: 'South Loop & Lakeshore',
    zips: ['60605', '60615', '60616', '60617', '60619', '60637', '60649', '60653'],
    neighborhoods: ['South Loop', 'Bronzeville', 'Bridgeport', 'Hyde Park', 'Kenwood', 'South Shore', 'Chatham'],
    mapQuery: 'Hyde Park Chicago IL'
  },
  {
    label: 'Southwest Side',
    zips: ['60608', '60609', '60623', '60629', '60632'],
    neighborhoods: ['Pilsen', 'Little Village', 'Back of the Yards', 'Gage Park', 'Brighton Park'],
    mapQuery: 'Pilsen Chicago IL'
  },
  {
    label: 'Western Suburbs',
    zips: ['60302', '60513', '60521', '60523', '60540', '60563', '60181', '60137'],
    neighborhoods: ['Oak Park', 'River Forest', 'La Grange', 'Hinsdale', 'Oak Brook', 'Elmhurst', 'Downers Grove', 'Naperville', 'Wheaton'],
    mapQuery: 'Oak Park IL'
  },
  {
    label: 'North Shore & Lake County',
    zips: ['60091', '60093', '60068', '60062', '60025', '60026', '60016', '60201'],
    neighborhoods: ['Wilmette', 'Winnetka', 'Park Ridge', 'Glenview', 'Northbrook', 'Skokie', 'Evanston', 'Des Plaines'],
    mapQuery: 'Wilmette IL'
  },
  {
    label: 'Northwest Suburbs',
    zips: ['60004', '60005', '60007', '60008', '60010', '60056', '60070'],
    neighborhoods: ['Arlington Heights', 'Mount Prospect', 'Elk Grove Village', 'Palatine', 'Rolling Meadows', 'Buffalo Grove', 'Prospect Heights'],
    mapQuery: 'Arlington Heights IL'
  },
  {
    label: 'South & Southwest Suburbs',
    zips: ['60411', '60419', '60423', '60429', '60438', '60439', '60448', '60453', '60457', '60462', '60463', '60471', '60477', '60487'],
    neighborhoods: ['Tinley Park', 'Orland Park', 'Homewood', 'Flossmoor', 'Oak Lawn', 'Frankfort', 'Mokena', 'Palos Heights', 'Country Club Hills', 'Matteson'],
    mapQuery: 'Tinley Park IL'
  }
];

const COVERAGE_BY_ZIP = COVERAGE_REGIONS.reduce<Record<string, CoverageRegion>>((acc, region) => {
  region.zips.forEach((zip) => {
    acc[zip] = region;
  });
  return acc;
}, {});

const POPULAR_NEIGHBORHOODS = Array.from(new Set(SERVICE_AREAS)).slice(0, 18);

const sanitizeZip = (value: string) => value.replace(/[^0-9]/g, '').slice(0, 5);

export default function ServiceAreaMap() {
  const [zipInput, setZipInput] = useState(BRAND.hqZip || '60601');
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);

  const normalizedZip = useMemo(() => sanitizeZip(zipInput), [zipInput]);
  const coverage = normalizedZip.length === 5 ? COVERAGE_BY_ZIP[normalizedZip] ?? null : null;
  const neighborhoods = coverage?.neighborhoods ?? POPULAR_NEIGHBORHOODS;
  const mapQuery = coverage?.mapQuery ?? (normalizedZip.length === 5 ? `Chicago IL ${normalizedZip}` : 'Chicago IL');
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${coverage ? 12 : 10}&output=embed`;

  const toggleNeighborhood = (name: string) => {
    setSelectedNeighborhoods((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const headline = coverage ? coverage.label : normalizedZip.length === 5 ? 'Covered across Chicagoland' : 'Chicago & Suburbs';

  return (
    <section className="card space-y-5">
      <header className="space-y-3 text-left">
        <div className="comic-panel inline-flex items-center gap-2 rounded-full bg-[#83f2c5] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-[#04384a]">
          <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-[#0fa3b1]" aria-hidden />
          Dial in your neighborhood
        </div>
        <h2 className="comic-outline text-3xl text-[#04384a]">Snap To Clean covers the whole Chicago metro</h2>
        <p className="text-sm font-semibold text-[#04384a]/80">Punch in a ZIP to see where our colorful trucks roll daily. City, North Shore, west burbs, Southland &mdash; we’ve got you.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-extrabold uppercase text-[#04384a]">Your ZIP code</label>
            <input
              value={zipInput}
              onChange={(event) => setZipInput(event.target.value)}
              inputMode="numeric"
              maxLength={5}
              placeholder="e.g. 60611"
              className="mt-2 w-full rounded-[20px] border-4 border-[#04384a] bg-white px-4 py-3 text-base font-bold uppercase tracking-wide text-[#04384a] shadow-[6px_6px_0_rgba(4,56,74,0.2)] focus:border-[#0fa3b1] focus:outline-none focus:ring-2 focus:ring-[#83f2c5]"
            />
            <p className="mt-2 text-xs font-bold uppercase text-[#04384a]/70">{headline}</p>
          </div>

          <div className="overflow-hidden rounded-[28px] border-4 border-[#04384a] shadow-[10px_10px_0_rgba(4,56,74,0.18)]">
            <iframe
              title="Service area map"
              src={mapSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full"
            />
          </div>
          <p className="text-xs font-semibold uppercase text-[#04384a]/70">
            Out of bounds? Text {BRAND.sms.replace('+1', '')} and we’ll assemble a crew anywhere in Chicagoland or Northwest Indiana.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase text-[#04384a]">Popular neighborhoods</h3>
            {coverage ? (
              <span className="comic-panel rounded-full bg-[#83f2c5] px-3 py-1 text-xs font-bold uppercase text-[#04384a]">ZIP {normalizedZip}</span>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {neighborhoods.map((name) => {
              const active = selectedNeighborhoods.includes(name);
              return (
                <button
                  type="button"
                  key={name}
                  onClick={() => toggleNeighborhood(name)}
                  className={`chip ${active ? 'chip-active' : ''}`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {selectedNeighborhoods.length ? (
            <div className="comic-panel rounded-[24px] bg-[#83f2c5]/70 p-4 text-sm font-semibold text-[#04384a]">
              <div className="font-extrabold uppercase">Selected areas</div>
              <p className="mt-1 text-xs uppercase">We’ll prioritize arrival windows near: {selectedNeighborhoods.join(', ')}.</p>
            </div>
          ) : (
            <div className="comic-panel rounded-[24px] bg-white p-4 text-sm text-[#04384a]">
              <div className="font-extrabold uppercase">Not seeing your ZIP?</div>
              <p className="mt-1 text-xs uppercase text-[#04384a]/75">We cover every ZIP in Cook, DuPage, Will, Lake, and Kane counties. Pop your code above to find the closest crew.</p>
            </div>
          )}

          <div className="comic-panel rounded-[24px] bg-[#0fa3b1]/10 p-4 text-xs font-semibold uppercase text-[#04384a]">
            Also rolling through: {SERVICE_AREAS.slice(0, 12).join(', ')} &hellip;
          </div>
        </div>
      </div>
    </section>
  );
}
