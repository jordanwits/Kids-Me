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
  // TODO(client): the live Contact page publishes office.kidsandmeredding@gmail.com.
  // The scope of work stands up director@reddingpreschools.com. Confirm which is
  // primary before launch — both are currently in play.
  email: {
    label: "director@reddingpreschools.com",
    href: "mailto:director@reddingpreschools.com",
  },
  emailLegacy: {
    label: "office.kidsandmeredding@gmail.com",
    href: "mailto:office.kidsandmeredding@gmail.com",
  },
  hours: "Monday – Friday, 7:00 a.m. – 5:30 p.m.",
  registrationFormUrl:
    "https://schools.procareconnect.com/form/4f0c76fe-a9a0-4bab-a861-15e32b50b916",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=3695+Churn+Creek+Road+Redding+CA+96002",
  mapEmbedUrl:
    "https://www.google.com/maps?q=3695+Churn+Creek+Road,+Redding,+CA+96002&output=embed",
} as const;

export type NavChild = { label: string; href: string; blurb?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/**
 * Every child is a distinct destination — either its own route, or a real and
 * substantial section on the parent's page. No child repeats its parent's href,
 * so nothing in the menu lands you where you already are.
 */
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "Why Choose Us",
        href: "/about#why",
        blurb: "What sets the school apart",
      },
      {
        label: "What Parents Say",
        href: "/about#applause",
        blurb: "Reviews from Redding families",
      },
    ],
  },
  { label: "Staff", href: "/staff" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      {
        label: "Curriculum by Age",
        href: "/programs#curriculum",
        blurb: "What they learn, room by room",
      },
      {
        label: "Monthly Themes",
        href: "/programs#themes",
        blurb: "Twelve months, thirty-six subjects",
      },
      {
        label: "A Day at Kids & Me",
        href: "/programs#day",
        blurb: "How a day is shaped",
      },
    ],
  },
  {
    label: "Tuition & Enrollment",
    href: "/enrollment",
    children: [
      {
        label: "Registration Form",
        href: "/enrollment#form",
        blurb: "Enroll online in minutes",
      },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

/**
 * TODO(client): the two daily rates below are PLACEHOLDERS.
 *
 * The current site carries an "Our Prices & Rates" heading on its About Us page
 * with nothing underneath it — no daily rate has ever actually been published.
 * Only the $100 per-family registration fee is real. Brett has to supply the
 * full day and half day figures before this page can go live. Any rate marked
 * `placeholder` renders with a visible "pending" flag in development.
 */
export const rates = [
  {
    name: "Full Day",
    price: "$52",
    unit: "/ day",
    placeholder: true,
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
    placeholder: true,
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
    placeholder: false,
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

/**
 * Verbatim from the current site's Applause page. `short` is the trimmed pull
 * quote used on the home page; `quote` is the full text, shown on /about.
 */
export const testimonials = [
  {
    quote:
      "Our family loves Kids & Me! The newly refurbished facility is beautiful and stimulating to the kids. The staff is wonderful and you can really tell these kids are loved like one of their very own! Kaine is excited to go to school every day and learn because the teachers make every day exciting and fun for the kids. I know that when I drop off Kaine at school, he is safe and cared for. I highly recommend Kids & Me to every parent looking for a fantastic preschool!",
    short:
      "The staff is wonderful and you can really tell these kids are loved like one of their very own. Kaine is excited to go to school every day.",
    author: "Amy",
    accent: "coral",
  },
  {
    quote:
      "I am the proud mom of an active, creative, stubborn, ornery, and oh so smart four year old boy. The ladies at Kids & Me Preschool work so hard to make sure my son learns everything he needs to know, to be prepared for kindergarten, regardless of how distracted a four year old can be. Since he started at Kids & Me, he has learned his alphabet (in the right order), how to count, how to write his name, and even how to read and recognize words. The structured class time in the Pre-K classroom has prepared him for kindergarten, and every day he comes home with new stories of lessons learned, books read in circle time, and art projects done, in his class with Teacher Pam. I would recommend Kids & Me to anyone looking for a clean, safe, and stimulating environment for their child.",
    short:
      "Since he started at Kids & Me he's learned his alphabet in the right order, how to count, how to write his name, and even how to read and recognize words.",
    author: "Tricia",
    accent: "teal",
  },
  {
    quote:
      "How much Miah has grown in just the short time she has spent at Kids & Me. Miah started attending in September 2013. Our family was experiencing some shifting and I needed somewhere Miah could stay while I worked. It has been a blessing for Miah to have something she can look forward to and somewhere she can learn, socialize and grow. The staff at Kids & Me are loving and caring. Miah talks about her teachers all the time. I am grateful that I can trust she is being loved and cared for the way I would like. The improvements around Kids & Me lately are outstanding. I was already impressed with the unique structure of Kids & Me when I first signed Miah up, and the recent maintenance and upgrades that have been completed are remarkable. Miah really enjoys outside time and has truly enjoyed the extra love that has been put into the outside playground area.",
    short:
      "The staff at Kids & Me are loving and caring. Miah talks about her teachers all the time. I'm grateful that I can trust she is being loved and cared for the way I would like.",
    author: "Mindy",
    accent: "gold",
  },
  {
    quote:
      "Kids & Me is an amazing daycare with the best teachers. My daughter has been coming here for 2 years and absolutely loves it!",
    short:
      "Kids & Me is an amazing daycare with the best teachers. My daughter has been coming here for 2 years and absolutely loves it!",
    author: "Ashley",
    accent: "mauve",
  },
] as const;
