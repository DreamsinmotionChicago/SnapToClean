'use client';
import React from 'react';

const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '';
const gaId = process.env.NEXT_PUBLIC_GA4_ID || '';

export default function Analytics() {
  return (
    <>
      {pixelId ? (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js'); fbq('init','${pixelId}'); fbq('track','PageView');`
            }}
          />
          <noscript>
            <img height="1" width="1" style={{display:'none'}}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}

      {gaId ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config','${gaId}');`
            }}
          />
        </>
      ) : null}
    </>
  );
}
