/**
 * Single source of truth for contact details, navigation and rate data.
 * Everything the client is likely to correct lives here, not in JSX.
 */

export const site = {
  name: "Kids & Me Preschool",
  tagline: "Preschool & Daycare · Redding, California",
  established: 1978,
  license: "455408599",
  address: {
    street: "3695 Churn Creek Road",
    city: "Redding",
    state: "CA",
    zip: "96002",
    get full() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
  },
  phone: { label: "(530) 215-1033", href: "tel:+15302151033", note: "Office" },
  phoneAlt: {
    label: "(530) 917-5812",
    href: "tel:+15309175812",
    note: "Director's cell",
  },
  // TODO(client): confirm before launch — scope of work has this address being
  // stood up fresh. Swap to office.kidsandmeredding@gmail.com if that stays primary.
  email: {
    label: "director@reddingpreschools.com",
    href: "mailto:director@reddingpreschools.com",
  },
  hours: "Monday – Friday, 7:00 a.m. – 5:30 p.m.",
  registrationFormUrl:
    "https://schools.procareconnect.com/form/4f0c76fe-a9a0-4bab-a861-15e32b50b916",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=3695+Churn+Creek+Road+Redding+CA+96002",
} as const;

export type NavChild = { label: string; href: string; blurb?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: "About Us",
    href: "#about",
    children: [
      { label: "Our Story", href: "#about", blurb: "Caring for Redding kids since 1978" },
      { label: "Our Staff", href: "#about", blurb: "Meet the teachers" },
      { label: "Daily Schedule", href: "#programs", blurb: "How a day is shaped" },
      { label: "Lunch & Snack Menu", href: "#about", blurb: "Nutritious meals included" },
      { label: "Work Opportunities", href: "#about", blurb: "Join our team" },
    ],
  },
  {
    label: "Programs",
    href: "#programs",
    children: [
      { label: "Toddlers · Ages 2–3", href: "#programs", blurb: "First classroom, big feelings" },
      { label: "Pre-K 1 · Age 4", href: "#programs", blurb: "Letters, numbers, curiosity" },
      { label: "Pre-K 2 · Age 5", href: "#programs", blurb: "Kindergarten readiness" },
      { label: "Curriculum", href: "#programs", blurb: "What they learn, by age" },
    ],
  },
  { label: "Why Choose Us", href: "#why" },
  { label: "Tuition", href: "#tuition" },
  {
    label: "Tours & Enrollment",
    href: "#enroll",
    children: [
      { label: "Request a Tour", href: "#enroll", blurb: "Drop in, no appointment needed" },
      { label: "Registration Form", href: "#enroll", blurb: "Enroll online in minutes" },
      { label: "Rates & Tuition", href: "#tuition", blurb: "Published daily rates" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

/**
 * TODO(client): daily rates are placeholders — the current site publishes only
 * the $100 registration fee. Brett needs to confirm the three figures below.
 */
export const rates = [
  {
    name: "Full Day",
    price: "$52",
    unit: "/ day",
    hours: "Up to 10.5 hours · 7:00 a.m. – 5:30 p.m.",
    accent: "teal",
    features: [
      "Breakfast, hot lunch & afternoon snack",
      "Full preschool curriculum",
      "Outdoor play & nap time",
      "Any days of the week you need",
    ],
    featured: true,
  },
  {
    name: "Half Day",
    price: "$38",
    unit: "/ day",
    hours: "Up to 5 hours · morning or afternoon",
    accent: "gold",
    features: [
      "Snack included",
      "Full preschool curriculum",
      "Outdoor play",
      "Great first step for age 2",
    ],
    featured: false,
  },
  {
    name: "Registration",
    price: "$100",
    unit: "one time",
    hours: "Per family, not per child",
    accent: "mauve",
    features: [
      "Covers every child in your family",
      "Supplies & materials for the year",
      "Secures your child's spot",
      "Never charged twice",
    ],
    featured: false,
  },
] as const;

export const testimonials = [
  {
    quote:
      "Our family loves Kids & Me! The staff is wonderful and you can really tell these kids are loved like one of their very own. Kaine is excited to go to school every day.",
    author: "Amy",
    accent: "coral",
  },
  {
    quote:
      "Since he started at Kids & Me he's learned his alphabet in the right order, how to count, how to write his name, and even how to read and recognize words.",
    author: "Tricia",
    accent: "teal",
  },
  {
    quote:
      "The staff at Kids & Me are loving and caring. Miah talks about her teachers all the time. I'm grateful that I can trust she is being loved and cared for the way I would like.",
    author: "Mindy",
    accent: "gold",
  },
] as const;
