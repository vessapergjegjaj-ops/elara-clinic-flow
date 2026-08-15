export type Treatment = {
  id: string;
  name: string;
  category: string;
  duration: string;
  results: string;
  price: string;
  description: string;
};

export const categories = [
  "Dermal Fillers",
  "Botox",
  "Laser Hair Removal",
  "Skin Boosters",
  "Facials & Peels",
] as const;

export const treatments: Treatment[] = [
  {
    id: "lip-filler",
    name: "Signature Lip Filler",
    category: "Dermal Fillers",
    duration: "30 mins",
    results: "6–12 months",
    price: "€180 – €260",
    description:
      "Hyaluronic acid artistry for balanced, naturally hydrated lips with definition that suits your facial harmony.",
  },
  {
    id: "cheek-filler",
    name: "Cheek & Midface Contour",
    category: "Dermal Fillers",
    duration: "45 mins",
    results: "12–18 months",
    price: "€290 – €420",
    description:
      "Structural volume restoration that lifts the midface and sculpts refined, elegant cheekbones.",
  },
  {
    id: "nose-filler",
    name: "Non-Surgical Rhinoplasty",
    category: "Dermal Fillers",
    duration: "40 mins",
    results: "12–18 months",
    price: "€350 – €480",
    description:
      "Precision liquid profiloplasty to smooth bumps and refine the tip — no downtime, immediate result.",
  },
  {
    id: "botox-upper",
    name: "Anti-Wrinkle Upper Face",
    category: "Botox",
    duration: "20 mins",
    results: "3–5 months",
    price: "€150 – €240",
    description:
      "Forehead, glabella and crow's feet softened with micro-dosed neuromodulator for expressive, natural movement.",
  },
  {
    id: "botox-masseter",
    name: "Masseter Slimming",
    category: "Botox",
    duration: "25 mins",
    results: "4–6 months",
    price: "€220 – €300",
    description:
      "Jawline slimming and bruxism relief through targeted masseter treatment by a certified injector.",
  },
  {
    id: "laser-full",
    name: "Full Body Laser (Diode)",
    category: "Laser Hair Removal",
    duration: "75 mins",
    results: "Permanent reduction",
    price: "€160 / session",
    description:
      "FDA-cleared diode platform with contact cooling for comfortable, effective clearance on all skin tones.",
  },
  {
    id: "laser-face",
    name: "Facial Laser Session",
    category: "Laser Hair Removal",
    duration: "25 mins",
    results: "Permanent reduction",
    price: "€45 / session",
    description:
      "Gentle facial hair reduction for upper lip, chin and jawline with zero downtime.",
  },
  {
    id: "profhilo",
    name: "Profhilo Bio-Remodelling",
    category: "Skin Boosters",
    duration: "35 mins",
    results: "6 months",
    price: "€320 / session",
    description:
      "Injectable hydration that remodels laxity and delivers the signature inner glow across face and neck.",
  },
  {
    id: "polynucleotide",
    name: "Polynucleotide Eye Rejuvenation",
    category: "Skin Boosters",
    duration: "30 mins",
    results: "4–6 months",
    price: "€280 / session",
    description:
      "Regenerative under-eye therapy that improves crepiness, dark circles and skin quality.",
  },
  {
    id: "hydrafacial",
    name: "Signature Hydrafacial",
    category: "Facials & Peels",
    duration: "60 mins",
    results: "3–4 weeks",
    price: "€95",
    description:
      "Cleanse, extract and infuse in one ritual — immediate luminosity for events and everyday glow.",
  },
  {
    id: "peel",
    name: "Medical Grade Peel",
    category: "Facials & Peels",
    duration: "45 mins",
    results: "2–3 months",
    price: "€120 – €190",
    description:
      "Tailored acid resurfacing for pigmentation, texture and acne-prone skin, protocolled by a dermatologist.",
  },
  {
    id: "microneedling",
    name: "RF Microneedling",
    category: "Facials & Peels",
    duration: "70 mins",
    results: "6–12 months",
    price: "€250 / session",
    description:
      "Radiofrequency collagen induction for pores, scarring and firmness with minimal social downtime.",
  },
];

export const doctors = [
  {
    id: "dr-elira",
    name: "Dr. Elira Krasniqi",
    title: "Founder · Consultant Dermatologist",
    qualifications: "MD, EADV Member · 12 years in aesthetic medicine",
    badges: ["Allergan Certified Injector", "Board-Certified Dermatologist"],
  },
  {
    id: "dr-ardit",
    name: "Dr. Ardit Berisha",
    title: "Aesthetic Physician · Laser Lead",
    qualifications: "MD, Advanced Laser & Energy Devices Diploma",
    badges: ["FDA Cleared Equipment", "Laser Safety Officer"],
  },
  {
    id: "nurse-rina",
    name: "Rina Gashi, RN",
    title: "Senior Aesthetic Nurse Injector",
    qualifications: "BSc Nursing · Level 7 Injectables",
    badges: ["Restylane Trainer", "Advanced Skin Boosters"],
  },
];

export const galleryCategories = [
  "Lips & Fillers",
  "Anti-Wrinkle Botox",
  "Non-Surgical Rhinoplasty",
  "Hydrafacial & Skin Quality",
] as const;

export const reviews = [
  {
    name: "Arta M.",
    rating: 5,
    tag: "Lip Filler",
    text: "The most natural result I've ever had. Dr. Elira listened for twenty minutes before touching a needle — that says everything.",
  },
  {
    name: "Fjolla K.",
    rating: 5,
    tag: "Profhilo",
    text: "My skin looks like it did ten years ago. The clinic itself feels like a five-star hotel in Peja.",
  },
  {
    name: "Dea S.",
    rating: 5,
    tag: "Non-Surgical Rhinoplasty",
    text: "Fifteen minutes and my profile is exactly what I always wanted. Zero pain, zero downtime.",
  },
  {
    name: "Blerina H.",
    rating: 5,
    tag: "Hydrafacial",
    text: "I book before every event. The glow lasts weeks and the team is genuinely warm.",
  },
  {
    name: "Lira P.",
    rating: 5,
    tag: "Anti-Wrinkle",
    text: "Subtle, refined, never frozen. Exactly the brief I gave and exactly what I received.",
  },
];

export const CLINIC = {
  name: "ORHIDEA AESTHETICS",
  phone: "+383 49 000 111",
  whatsapp: "38349000111",
  email: "hello@orhideaaesthetics.com",
  address: "Rr. Mbretëresha Teuta 24, Peja 30000, Kosovo",
  hours: [
    { d: "Monday – Friday", h: "09:00 – 19:00" },
    { d: "Saturday", h: "10:00 – 16:00" },
    { d: "Sunday", h: "Closed" },
  ],
};

export const whatsappLink = `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(
  "Hello ORHIDEA AESTHETICS, I would like to book a consultation.",
)}`;