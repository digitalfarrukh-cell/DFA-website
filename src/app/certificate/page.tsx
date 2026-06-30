import type { Metadata } from "next";
import CertificateTool from "@/components/CertificateTool";

// Private internal tool — keep it out of search engines.
export const metadata: Metadata = {
  title: "DFA Certificate Generator",
  robots: { index: false, follow: false },
};

export default function CertificatePage() {
  return <CertificateTool />;
}
