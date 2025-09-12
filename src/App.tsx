import { Routes, Route } from "react-router";
import Layout from "@/components/main/Layout";
import HomePage from "./pages/HomePage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookieConsent from "./pages/CookieConsent";
import About from "./pages/About";
import Careers from "./pages/Careers";
import CodeOfConduct from "./pages/CodeOfConduct";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/soon" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Careers />} />
        <Route path="/coc" element={<CodeOfConduct />} />
        <Route path="/tos" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/cookie-consent" element={<CookieConsent />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
