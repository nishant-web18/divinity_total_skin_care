/* Divinity Total Skin Care — content model for the website kit.
   Every value here is either ✅/🟡 confidence in the build brief, or an explicit
   `pending` placeholder. Nothing marked 🔴 or [CONFIRM] in the brief is stated as
   fact: fees, OPD hours, phone numbers, registration numbers, years of experience
   and before/after imagery all render through <Pending>. */

export const CLINIC = {
  name: "Divinity Total Skin Care",
  category: "Skin, Hair & Laser Clinic",
  addressLines: [
    "21/280, Kaveri Path, Madhyam Marg",
    "Near KL Saini Cricket Stadium",
    "Mansarovar, Jaipur, Rajasthan 302020",
  ],
  locality: "Mansarovar, Jaipur",
  landmark: "Near KL Saini Cricket Stadium",
  established: "2013",
  years: "13",
  lat: 26.8754787,
  lng: 75.7529494,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=26.8754787%2C75.7529494",
  /* Brief §1: every directory number needs confirming, and the IndiaMART number is a
     masked virtual line. One WhatsApp-enabled number replaces this placeholder. */
  phoneDisplay: "+91 XXXXX XXXXX",
  /* TODO: client to confirm number. Every call/WhatsApp button on the site reads these
     three fields — fill them here and nothing else needs touching. telUrl stays null
     until then so the call buttons are inert rather than dialling a wrong number. */
  telUrl: null,
  whatsappUrl:
    "https://wa.me/91XXXXXXXXXX?text=" +
    encodeURIComponent("Namaste, I'd like to book an appointment at Divinity Total Skin Care."),
  hindi: {
    tagline: "मनसरोवर, जयपुर में त्वचा, बाल और लेज़र क्लीनिक — 2013 से",
    whatsapp: "अपॉइंटमेंट के लिए व्हाट्सएप करें",
    contact: "हिंदी में बात करने के लिए भी आप हमें व्हाट्सएप कर सकते हैं।",
  },
};

/* The WhatsApp exchange shown in the product visual. One copy: the hero renders its
   first line as a compact preview on phones, and the booking section renders the full
   thread lower down, so the two can never drift apart. */
export const BOOKING_THREAD = [
  { direction: "in", sender: "Divinity Total Skin Care", text: "Namaste. Which concern would you like to come in for?", time: "18:42" },
  { direction: "out", text: "Acne scars — is Saturday possible?", time: "18:43" },
];

export const TRUST = [
  /* `short` is used in the 2-column mobile grid, where the full label wraps to three
     or more lines at 360px. Same fact, fewer words — never a different claim. */
  { value: "4.5 / 5", label: "across 735 patient stories on Practo", short: "735 Practo stories" },
  { value: "13 yrs", label: "at the same Mansarovar address, since 2013", short: "Same address since 2013" },
  { value: "2", label: "DNB dermatologists, not a franchise chain", short: "DNB dermatologists" },
  { value: "In-house", label: "pharmacy — medicines dispensed on site", short: "Pharmacy on site" },
];

/* Brief §8: the six money treatments that get their own pages. */
export const SIGNATURE_TREATMENTS = [
  {
    title: "Acne & acne scar treatment",
    body: "Active acne, post-acne marks and scarring, managed medically and then with peels or microneedling where they help.",
    tag: "Most asked for",
  },
  {
    title: "Laser hair removal",
    body: "Course-based laser hair reduction. Number of sessions depends on the area and on your skin and hair type.",
    tag: "Laser",
  },
  {
    title: "Robotic FUE hair transplant",
    body: "Described by the clinic as bloodless, stitchless and painless. Suitability is decided in consultation.",
    tag: "Hair",
  },
  {
    title: "Chemical peels & skin brightening",
    body: "Salicylic, glycolic, mandelic, lacti-peel and Obagi peels, chosen for the concern rather than sold as a package.",
    tag: "Aesthetic",
  },
  {
    title: "Pigmentation & melasma",
    body: "Melasma, sun spots and hyperpigmentation — treated as a medical problem first, with maintenance after.",
    tag: "Pigmentation",
  },
  {
    title: "Anti-ageing: Botox & mesotherapy",
    body: "Line and wrinkle smoothing, Botox and mesotherapy, done by a dermatologist rather than a salon.",
    tag: "Anti-ageing",
  },
];

/* Brief §3A — the clinic's own service list, in their words (IndiaMART). */
export const CLINIC_WORDS = [
  { title: "Skin disease consultation", body: "Acne, psoriasis, eczema, scabies, urticaria, vitiligo, lichen planus, fungal, bacterial and viral infections, melasma, leprosy." },
  { title: "Cosmetic procedures & LASER", body: "Chemical peels — salicylic acid, glycolic acid, lacti-peel, mandelic acid, Obagi — plus radiofrequency and electrocautery." },
  { title: "In-house pharmacy", body: "Medicines dispensed at the clinic, so nobody leaves a consultation and then hunts for a chemist." },
  { title: "Robotic FUE hair transplant", body: "Marketed by the clinic as bloodless, stitchless and painless." },
  { title: "Laser hair removal", body: "One of the two laser services the clinic lists first in its own listing copy." },
  { title: "Laser tattoo removal", body: "Multi-session removal, priced and planned by size, ink and depth." },
];

/* Brief §3B — union of Practo and Drlogy, cleaned. Junk directory entries
   (buttock implant, dental fillings, coronary angiogram, acupuncture) are excluded. */
export const TREATMENT_GROUPS = [
  {
    heading: "Skin — medical",
    tone: "mint",
    items: ["Acne & pimples", "Acne scars", "Psoriasis", "Eczema", "Vitiligo / leucoderma", "Urticaria", "Lichen planus", "Scabies", "Fungal, bacterial & viral infections", "Skin rash", "Melasma", "Hyperpigmentation", "Wart removal", "Mole removal", "Skin allergy testing"],
  },
  {
    heading: "Skin — aesthetic",
    tone: "sage",
    items: ["Chemical peels", "Microneedling", "Dermabrasion", "Skin polishing", "Anti-ageing treatment", "Botox", "Line & wrinkle smoothing", "Mesotherapy", "Stretch marks", "Scar treatment", "Sun & age spots", "Skin pulse treatment"],
  },
  {
    heading: "Laser",
    tone: "sky",
    items: ["Laser hair removal", "Laser tattoo removal", "Fractional CO2 resurfacing", "Laser resurfacing", "Fractional laser", "Electrocautery", "Radiofrequency"],
  },
  {
    heading: "Hair",
    tone: "cream",
    items: ["Robotic FUE hair transplant", "Hair transplant surgery", "Hair fall & trichology consultation", "Dandruff & scalp treatment"],
  },
  {
    heading: "Surgical",
    tone: "lilac",
    items: ["Dermatosurgery", "Minor skin procedures"],
  },
  {
    heading: "Also at the clinic",
    tone: "peach",
    items: ["Weight-loss diet counselling", "In-house pharmacy"],
  },
];

export const DOCTORS = [
  {
    name: "Dr. Prateek Manjul",
    role: "Consultant Dermatologist",
    specialisations: ["Dermatologist", "Cosmetologist", "Trichologist"],
    qualifications: [
      "MBBS — Sri Krishna Medical College, Muzaffarpur",
      "DNB — Dermatology & Venereology, National Board of Examination",
      "Diploma in Practical Dermatology, 2012",
    ],
    memberships: ["Indian Medical Association (IMA)", "American Academy of Aesthetic Medicine"],
    focus: ["Acne & acne scarring", "Eczema", "Hair disorders", "Pigmentation", "Parasitic & fungal skin infections"],
    rating: { value: "94%", label: "recommended on Practo, from 411 patient stories" },
    pending: ["Years of practice", "Current medical council registration", "MD — awarding institute", "Role at the clinic"],
  },
  {
    name: "Dr. Vinisha Baliyan",
    role: "Consultant Dermatologist & Dermatosurgeon",
    specialisations: ["Dermatologist", "Cosmetologist", "Trichologist", "Aesthetic Dermatologist", "Dermatosurgeon"],
    qualifications: [
      "MD Medicine — Saint Petersburg State Medical Academy of I.I. Mechnikov, Russia, 2003",
      "DNB — Dermatology & Venereology, Dr. P.N. Behl Skin Institute, New Delhi",
      "Master of Dermatology — Skin Institute & School of Dermatology",
    ],
    memberships: ["Indian Academy of Dermatology"],
    focus: ["Dermatosurgery", "Wart & mole removal", "Aesthetic dermatology", "Laser procedures", "Hair & scalp"],
    rating: { value: "97%", label: "recommended on Practo, from 324 patient stories" },
    pending: ["Years of practice", "Current medical council registration"],
  },
];

/* Brief §6 — real patient review text, published without reviewer names until
   consent is in hand or a live Google reviews widget replaces this block. */
export const REVIEWS = [
  { text: "Dr Prateek Manjul is just excellent. He can exactly pinpoint the skin issue… I got relief in one month.", context: "After five months of treatment elsewhere" },
  { text: "She listened patiently and explained everything clearly… made me feel comfortable.", context: "Consultation" },
  { text: "She explained everything clearly before starting, which immediately made me feel relaxed and comfortable.", context: "Wart removal" },
  { text: "One of the most professional doctors I've ever met. Highly recommended!", context: "Patient story" },
];

export const LOCALITIES = ["Mansarovar", "Madhyam Marg", "Shipra Path", "Nirman Nagar", "Gopalpura Bypass", "Vaishali Nagar", "Devi Nagar", "Patel Nagar"];

export const FAQS = [
  { q: "Do I need an appointment?", a: "Walk-ins are seen during OPD hours, but a message on WhatsApp before you travel means you are seen faster and by the right doctor." },
  { q: "Where exactly is the clinic?", a: "21/280, Kaveri Path, Madhyam Marg, near KL Saini Cricket Stadium, Mansarovar, Jaipur 302020. The stadium is the easiest landmark to navigate to." },
  { q: "Is there a pharmacy at the clinic?", a: "Yes. Medicines are dispensed in-house, so a consultation and its prescription are finished in one visit." },
  { q: "Will my results look like someone else's?", a: "No two skins respond identically. Every treatment plan is decided after an in-clinic examination, and results vary from person to person." },
  { q: "What does a consultation cost?", pending: "Consultation fee" },
  { q: "What are the OPD timings?", pending: "Day-by-day OPD hours" },
  { q: "Which doctor will I see?", pending: "Days each doctor sits" },
  { q: "Can I pay by UPI or card?", pending: "Accepted payment methods" },
  { q: "Is parking available?", pending: "Parking & access details" },
  { q: "Is the hair transplant done at the clinic?", pending: "Whether robotic FUE is in-house" },
];

export const NAV_LINKS = ["Treatments", "Doctors", "Fees & FAQ", "Contact"];
