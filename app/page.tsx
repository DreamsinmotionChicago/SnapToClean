'use client';
import React, { useMemo, useState } from 'react';
import { BRAND, COPY } from '@/lib/config';
import PhotoUploader from '@/components/PhotoUploader';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import PaperShader from '@/components/PaperShader';
import { estimateRange } from '@/lib/pricing';
import { fbTrack, gaTrack } from '@/lib/pixel';

type ItemCounts = { appliance: number; mattress: number; tv: number; hotTub: number; piano: number };
type Access = { stairs: boolean; stairsFlights: number; elevator: boolean; curbside: boolean; longCarry: boolean };
const FRAC_LABEL: Record<number,string> = {0.125:'1/8',0.25:'1/4',0.375:'3/8',0.5:'1/2',0.625:'5/8',0.75:'3/4',0.875:'7/8',1:'Full'};

export default function Page() {
  const [step, setStep] = useState(1);
  const [zip, setZip] = useState(BRAND.hqZip);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState<string>('');
  const [windowTime, setWindowTime] = useState('');
  const [haz, setHaz] = useState<'no'|'unsure'|'yes'>('no');
  const [items, setItems] = useState<string[]>([]);
  const [counts, setCounts] = useState<ItemCounts>({ appliance: 0, mattress: 0, tv: 0, hotTub: 0, piano: 0 });
  const [access, setAccess] = useState<Access>({ stairs: false, stairsFlights: 0, elevator: false, curbside: false, longCarry: false });
  const [volume, setVolume] = useState(0.25);
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{low:number;high:number;message:string;bookingLink?:string}|null>(null);

  const progress = (step/4)*100;

  const handleChip = (val: string) => {
    setItems(prev => prev.includes(val) ? prev.filter(v=>v!==val) : [...prev, val]);
  };

  const estimate = useMemo(() => {
    const e = estimateRange({
      truckFraction: volume,
      addOns: { ...counts },
      access: { curbside: access.curbside, longCarry: access.longCarry, stairsFlights: access.stairs ? access.stairsFlights : 0 }
    });
    return e;
  }, [volume, counts, access]);

  async function uploadPhotos(): Promise<string[]> {
    if (!files.length) return [];
    const body = new FormData();
    files.forEach((f, i) => body.append('files', f, f.name || `photo-${i}.jpg`));
    const res = await fetch('/api/upload', { method: 'POST', body });
    if (!res.ok) throw new Error('Upload failed');
    const json = await res.json();
    return json.urls as string[];
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const photoUrls = await uploadPhotos();

      const payload = {
        when: { date, window: windowTime || null },
        where: { zip, address: address || null },
        items,
        flags: { haz, access },
        volume: { truck_fraction: volume },
        addOns: counts,
        photos: photoUrls,
        contact: { name, phone, email: email || null, smsConsent },
        marketing: { href: typeof window !== 'undefined' ? window.location.href : '' }
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      setResult({
        low: json.estimate.low,
        high: json.estimate.high,
        bookingLink: json.bookingLink,
        message: haz !== 'no' ? 'Note: hazardous items may be excluded or surcharged.' : ''
      });

      fbTrack('Lead', { value: json.estimate.low, currency: 'USD' });
      gaTrack('lead_submitted', { value: json.estimate.low });
    } catch (err:any) {
      alert('There was an error submitting your request. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 md:space-y-12">
      {/* HERO */}
      <section className="hero-gradient space-y-6 px-6 py-10 text-center relative overflow-hidden">
        <PaperShader variant="paper" className="rounded-[36px]" />
        <div className="comic-panel mx-auto inline-flex items-center gap-2 rounded-full bg-[#83f2c5] px-4 py-2 text-sm font-extrabold uppercase text-[#04384a] relative z-10">
          ⚡ Same-day junk justice anywhere in Chicago
        </div>
        <h1 className="comic-outline mx-auto max-w-3xl text-4xl font-bold uppercase text-[#04384a] md:text-6xl relative z-10">{COPY.heroTitle}</h1>
        <p className="mx-auto max-w-2xl text-base font-semibold text-[#04384a]/85 md:text-lg relative z-10">
          {COPY.heroSub} Snap To Clean brings the muscle, the trucks, and the good vibes — you just point at the clutter.
        </p>
        <div className="comic-panel mx-auto inline-block rounded-2xl bg-white px-5 py-3 text-sm font-bold uppercase text-[#04384a] relative z-10">
          💡 {COPY.truckSizeNote}
        </div>
      </section>

      {/* PRICING TABLE */}
      <section className="card pricing-highlight relative overflow-hidden">
        <PaperShader
          variant="grain"
          colors={['#04384a', '#0fa3b1', '#2ec4b6']}
          className="rounded-[32px] opacity-30"
        />
        <div className="mb-6 flex flex-wrap items-center gap-3 text-white relative z-10">
          <div className="comic-panel inline-flex items-center gap-2 rounded-full bg-[#0fa3b1] px-4 py-2 text-sm font-extrabold uppercase text-white">
            💰 Transparent Pricing
          </div>
          <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase text-white/90">No surprises • Tax & dump fees included</span>
        </div>
        <div className="mb-5 grid grid-cols-2 gap-4 text-center md:grid-cols-5 relative z-10">
          {[
            { label: '1/8 Truck', price: '$150' },
            { label: '1/4 Truck', price: '$250' },
            { label: '1/2 Truck', price: '$370' },
            { label: '3/4 Truck', price: '$490' },
            { label: 'Full Truck', price: '$600', featured: true }
          ].map(({ label, price, featured }) => (
            <div
              key={label}
              className={`rounded-3xl border-4 border-[#04384a] bg-white/95 px-4 py-5 font-semibold text-[#04384a] shadow-[8px_8px_0_rgba(4,56,74,0.25)] ${featured ? 'scale-105 bg-[#83f2c5]' : ''}`}
            >
              <div className="text-sm uppercase tracking-wide">{label}</div>
              <div className="mt-2 text-2xl font-extrabold text-[#0fa3b1]">{price}</div>
            </div>
          ))}
        </div>
        <p className="text-sm font-semibold uppercase text-white/90 relative z-10">Minimum <strong>$125</strong>. Heavy materials priced by bed-load. Mattresses & appliances included.</p>
      </section>

      <ServiceAreaMap />

      {/* FORM */}
      <form id="estimate-form" onSubmit={onSubmit} className="card space-y-5 relative overflow-hidden">
        <PaperShader variant="paper" className="rounded-[32px] opacity-40" />
        <div className="w-full overflow-hidden rounded-full bg-[#04384a]/10 relative z-10">
          <div className="h-3 rounded-full progress-bar transition-all duration-500 ease-out" style={{width: `${progress}%`}} />
        </div>
        <div className="text-center text-sm font-extrabold uppercase text-[#04384a] relative z-10">
          Step {step} of 4 • {Math.round(progress)}% Complete
        </div>

        {step === 1 && (
          <section className="space-y-5 relative z-10">
            <h3 className="comic-outline text-2xl text-[#04384a]">Where & When?</h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label-comic mb-1">ZIP code</label>
                <input value={zip} onChange={(e)=>setZip(e.target.value)} inputMode="numeric" pattern="\d{5}" required placeholder="60617" className="input-comic" />
              </div>
              <div>
                <label className="label-comic mb-1">Address (optional)</label>
                <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="123 Main St" className="input-comic" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-comic mb-1">Date</label>
                  <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required className="input-comic" />
                </div>
                <div>
                  <label className="label-comic mb-1">2‑hour window</label>
                  <select value={windowTime} onChange={(e)=>setWindowTime(e.target.value)} required className="input-comic">
                    <option value="">Select…</option>
                    <option>8–10</option><option>10–12</option><option>12–2</option><option>2–4</option><option>4–6</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>{ setStep(2); fbTrack('StartQuestionnaire'); gaTrack('start_questionnaire'); }} className="btn btn-primary flex-1">Next Mission</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-5 relative z-10">
            <h3 className="comic-outline text-2xl text-[#04384a]">What are we removing?</h3>
            <div className="flex flex-wrap gap-2">
              {['Furniture','Appliances','E‑waste/TVs','Mattresses','Bagged Trash/Boxes','Yard Waste','Construction Debris','Hot Tub','Piano','Other'].map((label)=>{
                const val = label.toLowerCase().replace(/[^a-z]+/g,'-');
                const active = items.includes(val);
                return (
                  <button type="button" key={val} onClick={()=>handleChip(val)} className={`chip ${active?'chip-active':''}`}>{label}</button>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(['appliance','mattress','tv'] as const).map((k)=>(
                <div key={k}>
                  <label className="label-comic mb-1">{k[0].toUpperCase()+k.slice(1)} count</label>
                  <input type="number" min={0} value={(counts as any)[k]} onChange={(e)=>setCounts(prev=>({...prev, [k]: Number(e.target.value||0)}))} className="input-comic" />
                </div>
              ))}
              <div>
                <label className="label-comic mb-1">Hot tub?</label>
                <select value={counts.hotTub} onChange={(e)=>setCounts(prev=>({...prev, hotTub: Number(e.target.value)}))} className="input-comic">
                  <option value={0}>No</option><option value={1}>Yes (1)</option>
                </select>
              </div>
              <div>
                <label className="label-comic mb-1">Piano?</label>
                <select value={counts.piano} onChange={(e)=>setCounts(prev=>({...prev, piano: Number(e.target.value)}))} className="input-comic">
                  <option value={0}>No</option><option value={1}>Yes (1)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-comic mb-1">Any hazardous items?</label>
              <select value={haz} onChange={(e)=>setHaz(e.target.value as any)} className="input-comic">
                <option value="no">No</option>
                <option value="unsure">Not sure</option>
                <option value="yes">Yes (we’ll advise)</option>
              </select>
              <p className="mt-1 text-xs font-semibold uppercase text-[#04384a]/70">Examples: paints, chemicals, refrigerants, tires, asbestos (may be excluded or surcharged).</p>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>setStep(1)} className="btn btn-ghost flex-1">Back</button>
              <button type="button" onClick={()=>setStep(3)} className="btn btn-primary flex-1">Keep Going</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-5 relative z-10">
            <h3 className="comic-outline text-2xl text-[#04384a]">Access & Volume</h3>
            <div className="flex flex-wrap gap-2">
              {['Stairs','Elevator','Curbside','Long carry'].map(label=>{
                const key = label.toLowerCase().replace(' ', '');
                const active = (access as any)[key] || false;
                return (
                  <button type="button" key={label} onClick={()=>setAccess(prev=>({...prev, [key]: !active}))} className={`chip ${active?'chip-active':''}`}>{label}</button>
                )
              })}
            </div>
            {access.stairs ? (
              <div>
                <label className="label-comic mb-1">How many flights of stairs?</label>
                <input type="number" min={1} max={10} value={access.stairsFlights} onChange={(e)=>setAccess(prev=>({...prev, stairsFlights: Number(e.target.value||0)}))} className="input-comic" />
                <p className="mt-1 text-xs font-semibold uppercase text-[#04384a]/70">First two flights included. Each additional flight may add a small fee.</p>
              </div>
            ) : null}

            <div>
              <label className="label-comic mb-1">Approx. volume (pickup truck = Full)</label>
              <input type="range" min={0.125} max={1} step={0.125} value={volume} onChange={(e)=>setVolume(Number(e.target.value))} className="h-2 w-full accent-[#0fa3b1]" />
              <div className="text-sm font-semibold uppercase text-[#04384a]/80">Selected: <strong>{FRAC_LABEL[volume as keyof typeof FRAC_LABEL] || volume}</strong> — Est. <strong>${estimate.low}–${estimate.high}</strong></div>
            </div>

            <PhotoUploader onChange={(files)=>{ setFiles(files); fbTrack('AddPhotos'); gaTrack('add_photos', {count: files.length}); }} />

            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>setStep(2)} className="btn btn-ghost flex-1">Back</button>
              <button type="button" onClick={()=>setStep(4)} className="btn btn-primary flex-1">Final Step</button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="space-y-5 relative z-10">
            <h3 className="comic-outline text-2xl text-[#04384a]">How can we reach you?</h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label-comic mb-1">Your name</label>
                <input required value={name} onChange={(e)=>setName(e.target.value)} className="input-comic" />
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label className="label-comic mb-1">Mobile (for SMS)</label>
                  <input required value={phone} onChange={(e)=>setPhone(e.target.value)} inputMode="tel" className="input-comic" />
                </div>
                <div>
                  <label className="label-comic mb-1">Email (optional)</label>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="input-comic" />
                </div>
              </div>
              <label className="text-xs font-bold uppercase text-[#04384a]">
                <input type="checkbox" checked={smsConsent} onChange={(e)=>setSmsConsent(e.target.checked)} className="checkbox-comic mr-2" /> I agree to receive SMS about my appointment.
              </label>

              <div className="glass-effect rounded-2xl border-4 border-[#04384a] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  <span className="text-lg font-extrabold uppercase text-[#0fa3b1]">Live Estimate</span>
                </div>
                <div className="mb-1 text-2xl font-extrabold text-[#04384a]">${estimate.low}–${estimate.high}</div>
                <div className="text-xs font-semibold uppercase text-[#04384a]/70">Updates automatically • Final price confirmed onsite • Heavy/hazardous items may be excluded or surcharged.</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>setStep(3)} className="btn btn-ghost flex-1">Back</button>
              <button type="submit" disabled={submitting} className="btn btn-primary flex-1">{submitting ? 'Hold tight…' : 'Show My Estimate!'}</button>
            </div>

            {result ? (
              <div className="mt-4 rounded-2xl border-4 border-[#04384a] bg-[#83f2c5]/70 p-4 shadow-[6px_6px_0_rgba(4,56,74,0.18)]">
                <h4 className="text-xl font-extrabold uppercase text-[#04384a]">Your instant estimate</h4>
                <p className="mt-1 text-sm font-semibold text-[#04384a]">Estimated total: <strong>${result.low}–${result.high}</strong>. {result.message}</p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <a href={`sms:${BRAND.sms}?&body=${encodeURIComponent('Hi — I just submitted the form. Here are my photos.')}`} className="btn btn-ghost flex-1">Send More Pics</a>
                  { (BRAND.bookingLink || result.bookingLink) ? (
                    <a href={BRAND.bookingLink || result.bookingLink!} className="btn btn-primary flex-1" target="_blank">Lock My Pickup</a>
                  ) : null }
                </div>
              </div>
            ) : null}
          </section>
        )}
      </form>
    </div>
  );
}
