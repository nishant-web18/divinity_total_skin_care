import React from "react";
import { TopNav } from "../../components/navigation/TopNav.jsx";
import { Logo } from "../../components/brand/Logo.jsx";
import { HomeScreen } from "./HomeScreen.jsx";
import { TreatmentsScreen } from "./TreatmentsScreen.jsx";
import { DoctorsScreen } from "./DoctorsScreen.jsx";
import { FeesFaqScreen } from "./FeesFaqScreen.jsx";
import { ContactScreen } from "./ContactScreen.jsx";
import { BookingDialog } from "./BookingDialog.jsx";
import { Footer } from "./Footer.jsx";
import { StickyBar } from "./Chrome.jsx";
import { MobileActionStack } from "./MobileActionStack.jsx";
import { useIsMobile } from "../../components/hooks/useMediaQuery.js";
import { CLINIC, NAV_LINKS } from "./clinic.js";

const screens = {
  Home: HomeScreen,
  Treatments: TreatmentsScreen,
  Doctors: DoctorsScreen,
  "Fees & FAQ": FeesFaqScreen,
  Contact: ContactScreen,
};

/* Each screen gets a URL so it can be linked, shared, indexed and audited
   individually — a clinic site whose treatment page has no address is invisible. */
const slugs = { Home: "", Treatments: "treatments", Doctors: "doctors", "Fees & FAQ": "fees-faq", Contact: "contact" };
const pages = Object.keys(slugs);
const pageForHash = (hash) => pages.find((p) => slugs[p] === String(hash || "").replace(/^#/, "")) || "Home";

export function App() {
  const [page, setPage] = React.useState(() => pageForHash(window.location.hash));
  const [booking, setBooking] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const onHash = () => { setPage(pageForHash(window.location.hash)); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (next) => {
    const target = screens[next] ? next : "Home";
    const slug = slugs[target];
    if (pageForHash(window.location.hash) === target) window.scrollTo(0, 0);
    window.location.hash = slug ? "#" + slug : "";
    setPage(target);
  };

  const Screen = screens[page] || HomeScreen;

  return (
    <div style={{ background: "var(--surface-page-canvas)", minHeight: "100dvh", paddingBottom: isMobile ? 0 : "var(--sticky-bar-clearance)" }}>
      <TopNav
        brand={<Logo height={46} style={{ display: "block", maxWidth: "100%" }} />}
        brandLabel={CLINIC.name}
        links={NAV_LINKS}
        active={page === "Home" ? undefined : page}
        onBrandClick={(e) => { e.preventDefault(); navigate("Home"); }}
        onNavigate={navigate}
        ctaLabel="Book appointment"
        onCta={() => setBooking(true)}
        locale="EN / हिं"
        secondary={null}
        style={{ position: "sticky", top: 0, zIndex: 30 }}
      />
      <Screen onNavigate={navigate} onBook={() => setBooking(true)} />
      <Footer onNavigate={navigate} />
      {isMobile ? (
        <MobileActionStack page={page} hidden={booking} whatsappUrl={CLINIC.whatsappUrl} mapsUrl={CLINIC.mapsUrl} telUrl={CLINIC.telUrl} />
      ) : (
        <StickyBar phone={CLINIC.phoneDisplay} hindi={CLINIC.hindi.whatsapp} whatsappUrl={CLINIC.whatsappUrl} mapsUrl={CLINIC.mapsUrl} />
      )}
      <BookingDialog open={booking} onClose={() => setBooking(false)} />
    </div>
  );
}
