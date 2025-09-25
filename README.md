# Chicagoland Cleanouts — Mobile-first Junk Removal Landing Page

Next.js 14 + TypeScript + Tailwind. Mobile-first questionnaire with HEIC (iPhone) photo upload, instant estimate ranges, sticky mobile CTAs, and basic analytics hooks.

## Quick start
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Configure
Create `.env.local` in the project root:
```dotenv
NEXT_PUBLIC_BRAND_NAME="Chicagoland Cleanouts"
NEXT_PUBLIC_BRAND_PHONE="+1-312-555-0123"
NEXT_PUBLIC_BRAND_SMS="+1-312-555-0123"
NEXT_PUBLIC_BRAND_EMAIL="hello@example.com"
NEXT_PUBLIC_HQ_ZIP="60617"
NEXT_PUBLIC_BOOKING_LINK=""

NEXT_PUBLIC_FACEBOOK_PIXEL_ID=""
NEXT_PUBLIC_GA4_ID=""

# Optional Cloudinary unsigned upload
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
```

## What it does
- Sticky CTA bar (Text Photos, Tap to Call, Get Instant Estimate).
- 4-step wizard (Where/When → Items → Access/Volume → Contact).
- **HEIC → JPEG conversion + compression** in browser; uploads to `public/uploads`.
- Instant estimate range using Chicago‑competitive defaults.
- Saves leads to `./data/leads.jsonl` for easy review.
- Optional Meta Pixel + GA4 via env vars.

## Notes
- Writing to disk works locally. On serverless (e.g., Vercel), use a storage service (Cloudinary or Supabase Storage).
- Prices are owner-editable in `lib/pricing.ts`.
- Update service areas and copy in `lib/config.ts`.
