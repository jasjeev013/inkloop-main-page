

export default function Layout({ children }: { children: React.ReactNode }) {
  // ✅ Dynamic favicon
  /*useEffect(() => {
    function updateFavicon() {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const faviconHref = darkMode
        ? "/icons/skitbit-white.svg"
        : "/icons/favicon-dark.svg";
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconHref;
    }
    updateFavicon();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateFavicon);
  }, []);

  // ✅ GTM + Analytics
  useEffect(() => {
    // GTM
    (function (w, d, s, l, i) {
      // @ts-ignore
      w[l] = w[l] || [];
      // @ts-ignore
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const f = d.getElementsByTagName(s)[0];
      const j = d.createElement(s);
      // @ts-ignore
      const dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      // @ts-ignore
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      // @ts-ignore
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-NFLHXXGK");

    // GA
    const gtagScript = document.createElement("script");
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-W6LV22900R";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      // @ts-ignore
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", "G-W6LV22900R");
  }, []);*/

  return (
    <div className="font-inter min-h-screen bg-[#f1eee7] text-white">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
