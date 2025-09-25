export const BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || process.env.BRAND_NAME || "Snap To Clean",
  phone: process.env.NEXT_PUBLIC_BRAND_PHONE || process.env.BRAND_PHONE || "872-306-5170",
  sms: process.env.NEXT_PUBLIC_BRAND_SMS || process.env.BRAND_SMS || "872-306-5170",
  email: process.env.NEXT_PUBLIC_BRAND_EMAIL || process.env.BRAND_EMAIL || "hello@example.com",
  hqZip: process.env.NEXT_PUBLIC_HQ_ZIP || process.env.HQ_ZIP || "60617",
  bookingLink: process.env.NEXT_PUBLIC_BOOKING_LINK || process.env.BOOKING_LINK || ""
} as const;

export const SERVICE_AREAS = [
  'The Loop', 'West Loop', 'River North', 'Gold Coast', 'Streeterville',
  'Lincoln Park', 'Lakeview', 'Wrigleyville', 'Uptown', 'Rogers Park',
  'Logan Square', 'Bucktown', 'Wicker Park', 'West Town', 'Humboldt Park',
  'South Loop', 'Bronzeville', 'Hyde Park', 'Bridgeport', 'Pilsen',
  'Oak Park', 'Evanston', 'Skokie', 'Wilmette', 'Glenview',
  'Elmhurst', 'Downers Grove', 'Oak Brook', 'Naperville', 'Bolingbrook',
  'Tinley Park', 'Orland Park', 'Schaumburg', 'Arlington Heights', 'Northbrook'
];

export const COPY = {
  heroTitle: "Basement & Garage Cleanouts — Same‑Day in Chicago & Suburbs",
  heroSub: "Upfront, volume‑based pricing. Book online & save $20. Curbside saves $10.",
  trustBadges: ["Licensed & Insured", "2‑Hour Arrival Windows", "Donate/Recycle when possible"],
  truckSizeNote: "Typical full truck: ~15–16 cubic yards."
} as const;
