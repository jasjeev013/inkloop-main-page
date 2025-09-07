import ComingSoon from "@/components/main/ComingSoon";
import CountdownTimer from "@/components/main/CountdownTimer";
import { SiteHeader } from "@/components/main/SiteHeader";


export default function HomePage() {
  // Structured Data (pricing + page)
  // useEffect(() => {
  //   const pricingStructuredData = {
  //     "@context": "https://schema.org",
  //     "@type": "WebPageElement",
  //     "@id": "https://theskitbit.com/#pricing",
  //     name: "Pricing Plans",
  //     description: "3D Animation pricing plans",
  //     url: "https://theskitbit.com/#pricing",
  //   };
  //   const script = document.createElement("script");
  //   script.type = "application/ld+json";
  //   script.innerHTML = JSON.stringify(pricingStructuredData);
  //   document.head.appendChild(script);

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  return (
    <main className="min-h-[100dvh]">
      <ComingSoon />
      <SiteHeader />
       <CountdownTimer />
    </main>
  );
}
