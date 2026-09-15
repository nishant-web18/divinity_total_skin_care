import React from "react";
import { TopNav } from "../../components/navigation/TopNav.jsx";
import { HomeScreen } from "./HomeScreen.jsx";
import { TreatmentsScreen } from "./TreatmentsScreen.jsx";
import { DoctorsScreen } from "./DoctorsScreen.jsx";
import { FeesFaqScreen } from "./FeesFaqScreen.jsx";
import { ContactScreen } from "./ContactScreen.jsx";
import { BookingDialog } from "./BookingDialog.jsx";
import { Footer } from "./Footer.jsx";
import { StickyBar } from "./Chrome.jsx";
import { CLINIC, NAV_LINKS } from "./clinic.js";

const screens = {
  Home: HomeScreen,
  Treatments: TreatmentsScreen,
  Doctors: DoctorsScreen,
  "Fees & FAQ": FeesFaqScreen,
  Contact: ContactScreen,
};

export function App() {
  const [page, setPage] = React.useState("Home");
  const [booking, setBooking] = React.useState(false);

  const navigate = (next) => {
    setPage(screens[next] ? next : "Home");
    window.scrollTo(0, 0);
  };

  const Screen = screens[page] || HomeScreen;

  return (
    <div style={{ background: "var(--surface-page-canvas)", minHeight: "100vh", paddingBottom: 104 }}>
      <TopNav
        brand={CLINIC.name}
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
      <StickyBar phone={CLINIC.phoneDisplay} hindi={CLINIC.hindi.whatsapp} whatsappUrl={CLINIC.whatsappUrl} mapsUrl={CLINIC.mapsUrl} />
      <BookingDialog open={booking} onClose={() => setBooking(false)} />
    </div>
  );
}
