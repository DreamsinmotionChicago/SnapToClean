export type EstimateInput = {
  truckFraction: number; // 0.125 .. 1
  addOns: { appliance?: number; mattress?: number; tv?: number; hotTub?: number; piano?: number };
  access: { curbside?: boolean; longCarry?: boolean; stairsFlights?: number };
};

export const VOLUME_TIERS = [
  { fraction: 0.125, label: "1/8",  price: 150 },
  { fraction: 0.25,  label: "1/4",  price: 250 },
  { fraction: 0.5,   label: "1/2",  price: 370 },
  { fraction: 0.75,  label: "3/4",  price: 490 },
  { fraction: 1,     label: "Full", price: 600 },
] as const;

export const ONSITE_MINIMUM = 125;
export const CURBSIDE_DISCOUNT = 10;
export const ADDONS = {
  appliance: 20, mattress: 15, tv: 15, hotTub: 150, piano: 250
} as const;
export const ACCESS_FEES = { stairsPerFlightOver2: 20, longCarry: 25 } as const;
export const HEAVY_MATERIALS_NOTE = "Heavy materials (concrete, brick, roofing shingles, dirt) priced by bed-load; final price confirmed onsite.";

function interpolateTierPrice(fraction: number) {
  const tiers = [...VOLUME_TIERS].sort((a,b)=>a.fraction-b.fraction);
  if (fraction <= tiers[0].fraction) return tiers[0].price;
  if (fraction >= tiers[tiers.length-1].fraction) return tiers[tiers.length-1].price;
  for (let i=0;i<tiers.length-1;i++) {
    const a = tiers[i], b = tiers[i+1];
    if (fraction >= a.fraction && fraction <= b.fraction) {
      const t = (fraction - a.fraction) / (b.fraction - a.fraction);
      return Math.round(a.price + t * (b.price - a.price));
    }
  }
  return tiers[tiers.length-1].price;
}

export function estimateRange(input: EstimateInput) {
  let base = interpolateTierPrice(input.truckFraction);

  // Add-ons by count
  const addOnsTotal =
    (input.addOns.appliance || 0) * ADDONS.appliance +
    (input.addOns.mattress || 0) * ADDONS.mattress +
    (input.addOns.tv || 0) * ADDONS.tv +
    (input.addOns.hotTub || 0) * ADDONS.hotTub +
    (input.addOns.piano || 0) * ADDONS.piano;

  base += addOnsTotal;

  // Access
  const extraFlights = Math.max(0, (input.access.stairsFlights || 0) - 2);
  let accessTotal = extraFlights * ACCESS_FEES.stairsPerFlightOver2;
  if (input.access.longCarry) accessTotal += ACCESS_FEES.longCarry;
  base += accessTotal;

  // Curbside discount
  if (input.access.curbside) base = Math.max(ONSITE_MINIMUM, base - CURBSIDE_DISCOUNT);

  const low = Math.max(ONSITE_MINIMUM, Math.round(base * 0.9));
  const high = Math.max(low + 50, Math.round(base * 1.15));

  return {
    low, high,
    breakdown: {
      base: interpolateTierPrice(input.truckFraction),
      addOnsTotal, accessTotal,
      curbsideDiscountApplied: !!input.access.curbside
    }
  };
}
