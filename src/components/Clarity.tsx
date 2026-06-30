"use client";

import Script from "next/script";
import { site } from "@/lib/site";

// Loads Microsoft Clarity (free heatmaps + session recordings).
// Returns nothing until a real Project ID is set in src/lib/site.ts (clarityId).
export default function Clarity() {
  const id: string = site.clarityId;
  if (!id) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${id}");
      `}
    </Script>
  );
}
