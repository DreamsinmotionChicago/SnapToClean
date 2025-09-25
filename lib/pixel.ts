export function fbTrack(event: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (w.fbq) {
    if (event === 'ViewContent' || event === 'Lead' || event === 'InitiateCheckout' || event === 'Purchase') {
      w.fbq('track', event, data || {});
    } else {
      w.fbq('trackCustom', event, data || {});
    }
  }
}

export function gaTrack(event: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (w.gtag) {
    w.gtag('event', event, data || {});
  }
}
