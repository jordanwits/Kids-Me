/**
 * Page content for the inner routes.
 *
 * Everything here is an edit pass over copy that already exists on
 * reddingpreschools.com, per section 3.2 of the scope of work. Where something
 * is NOT on the current site it carries a TODO(client) note saying so — the
 * staff roster and the daily rhythm are the two that need real input.
 */

/* ============================================================
   Classrooms & curriculum
   Source: /curriculum and /why-choose-us on the current site.
   `highlights` is the short list used on home page cards.
   `curriculum` is the full detail, shown on /programs.
   ============================================================ */

export type CurriculumGroup = { heading: string; items: string[] };

export const classrooms = [
  {
    slug: "toddler",
    age: "Ages 2 & 3",
    name: "Toddler Room",
    photo: "/images/gallery-classroom-redding-preschools-02.jpg",
    alt: "Toddlers at work in the Kids & Me toddler classroom",
    blurb:
      "First school, first friendships. Colors and shapes, counting to ten, and a hands-on look at magnets, seasons, insects and plants.",
    highlights: [
      "Letters, vocabulary and name recognition",
      "Manners, sharing and taking turns",
      "Glue, paint, watercolor and chalk",
      "Fine motor work with play dough and puzzles",
    ],
    accent: "teal",
    curriculum: [
      {
        heading: "Numbers, shapes and sorting",
        items: [
          "Identifying colors and shapes",
          "The numbers 1 through 10",
          "Touching and counting objects 1 to 10",
          "Copying color patterns",
          "Understanding different sizes",
        ],
      },
      {
        heading: "Discovering the world",
        items: [
          "A hands-on approach to magnets",
          "The four seasons and how they change",
          "Healthy habits and safety rules",
          "Insects, animals and plants",
        ],
      },
      {
        heading: "Early language",
        items: [
          "An introduction to letters",
          "Vocabulary building",
          "Stories and characters",
          "Name recognition and matching",
        ],
      },
      {
        heading: "Getting along with others",
        items: [
          "Following directions",
          "Making transitions",
          "Manners and social skills",
          "Conflict management",
          "Verbal skills",
        ],
      },
      {
        heading: "Hands and fingers",
        items: [
          "Glue, paint, watercolors and chalk",
          "Fine motor skills with play dough",
          "Beads and puzzles",
        ],
      },
    ] satisfies CurriculumGroup[],
  },
  {
    slug: "pre-k-one",
    age: "Age 4",
    name: "Pre-K One",
    photo: "/images/gallery-classroom-redding-preschools-03.jpg",
    alt: "A Pre-K classroom at Kids & Me Preschool",
    blurb:
      "The year curiosity turns into skill. Numbers to twenty, patterns and matching, and big questions about weather, seeds, bubbles and the ocean.",
    highlights: [
      "The alphabet by name and by sound",
      "Phonics woven into daily circle time",
      "Correct pencil grip and writing their name",
      "Following directions and transitions",
    ],
    accent: "gold",
    curriculum: [
      {
        heading: "Numbers and patterns",
        items: [
          "Recognizing the numbers 1 through 20",
          "Matching shapes and colors in patterns",
          "Building on every skill from the toddler class",
        ],
      },
      {
        heading: "Science and discovery",
        items: [
          "The weather",
          "Insects and animals",
          "Seeds and how things grow",
          "Our earth",
          "Bubbles and the ocean",
        ],
      },
      {
        heading: "Letters and phonics",
        items: [
          "An introduction to the alphabet",
          "Recognizing the letters by name",
          "Individual letter sounds",
          "Phonics folded into circle time",
        ],
      },
      {
        heading: "Learning to write",
        items: [
          "Correct pencil grip",
          "Writing their own name",
          "The letters of the alphabet",
          "Writing numbers",
        ],
      },
      {
        heading: "Routine and rhythm",
        items: [
          "Daily story time",
          "Movement through music",
          "Learning to follow directions",
          "Moving from free choice to centers and teacher-directed work",
        ],
      },
    ] satisfies CurriculumGroup[],
  },
  {
    slug: "pre-k-two",
    age: "Age 5",
    name: "Pre-K Two",
    photo: "/images/gallery-classroom-redding-preschools-05.jpg",
    alt: "Older preschoolers at Kids & Me Preschool",
    blurb:
      "Everything aims at kindergarten. Long and short vowels, consonant sounds, and the confidence to walk into a new school ready.",
    highlights: [
      "Upper and lowercase letters, all phonetic sounds",
      "Rhyming words and three-step directions",
      "Recognizing numbers to 20, counting to 50",
      "Kindergarten readiness assessments each May",
    ],
    accent: "mauve",
    curriculum: [
      {
        heading: "Mastering letters",
        items: [
          "Correct formation of every letter",
          "The five vowels, long and short sounds",
          "Practising the consonant sounds",
          "Uppercase and lowercase recognition",
          "The phonetic sounds of all the letters",
        ],
      },
      {
        heading: "Listening and language",
        items: [
          "Recognizing words that rhyme",
          "Following three-step directions",
          "Positional words such as in, on and behind",
        ],
      },
      {
        heading: "Their own name",
        items: [
          "Stating their full name",
          "Recognizing and writing their first name",
          "Naming the letters that spell it",
        ],
      },
      {
        heading: "Numbers",
        items: [
          "Recognizing random numbers to 20",
          "Rote counting to 30",
          "Counting up to 50 objects correctly",
        ],
      },
      {
        heading: "Circle time and readiness",
        items: [
          "Listening and staying on topic when speaking",
          "Following directions",
          "Being kind to others",
          "Kindergarten Readiness Assessments each May",
        ],
      },
    ] satisfies CurriculumGroup[],
  },
] as const;

/* ============================================================
   Monthly themes — the wall calendar
   Source: /monthly-themes on the current site, verbatim.
   Twelve months, three subjects each, grouped into four seasons.
   ============================================================ */

export const monthlyThemes = [
  {
    season: "Fall",
    accent: "gold",
    months: [
      { name: "September", themes: ["Back to school", "Family", "All about me"] },
      {
        name: "October",
        themes: ["Community helpers", "Halloween", "Fire prevention"],
      },
      {
        name: "November",
        // TODO(client): "Native Americans" is the current site's wording. Worth
        // asking whether the school wants to keep it or update the phrasing.
        themes: ["Fall & Thanksgiving", "Pilgrims", "Native Americans"],
      },
    ],
  },
  {
    season: "Winter",
    accent: "mauve",
    months: [
      { name: "December", themes: ["Winter", "Christmas", "New Year's Eve"] },
      { name: "January", themes: ["Winter", "New Year", "Chinese New Year"] },
      { name: "February", themes: ["Friends", "Valentine's Day", "Presidents"] },
    ],
  },
  {
    season: "Spring",
    accent: "teal",
    months: [
      {
        name: "March",
        themes: ["Transportation", "St. Patrick's Day", "Spring"],
      },
      {
        name: "April",
        themes: ["Easter", "Plants and seeds", "Insects and spiders"],
      },
      {
        name: "May",
        themes: ["Mother's Day", "Rodeo", "Pets and farm animals"],
      },
    ],
  },
  {
    season: "Summer",
    accent: "coral",
    months: [
      { name: "June", themes: ["Summer fun", "Father's Day", "County fair"] },
      { name: "July", themes: ["4th of July", "Forest animals", "Zoo animals"] },
      { name: "August", themes: ["Ocean animals", "Fairy tales", "Camping"] },
    ],
  },
] as const;

/* ============================================================
   A day at Kids & Me
   Built from the activity list on /why-choose-us. Only the 7:00 open and
   5:30 close are published times, so the rest is deliberately described as
   a rhythm rather than a timetable.

   TODO(client): the scope of work has sample daily schedules being added
   later by the director. If she supplies real per-room times, swap them in.
   ============================================================ */

export const dailyRhythm = [
  {
    part: "Early morning",
    time: "From 7:00 a.m.",
    body: "Doors open. Quiet arrival, breakfast for the children who need it, and free choice at the tables while the rooms fill up.",
    accent: "gold",
  },
  {
    part: "Circle time",
    time: "Morning",
    body: "The whole room together. Story time, calendar, the month's theme, songs, and phonics folded in for the Pre-K classes.",
    accent: "teal",
  },
  {
    part: "Centers and projects",
    time: "Late morning",
    body: "Teacher-directed work and free choice centers. Craft projects, block building, manipulative toys, art and writing practice.",
    accent: "coral",
  },
  {
    part: "Outside",
    time: "Before lunch",
    body: "Outdoor recreation on the shaded, park-like playground. Every class gets outside every day the weather allows.",
    accent: "teal",
  },
  {
    part: "Lunch",
    time: "Midday",
    body: "A hot, nutritious lunch served family style in the lunchroom. Nothing to pack and nothing to bring.",
    accent: "mauve",
  },
  {
    part: "Nap and quiet",
    time: "Early afternoon",
    body: "Cots down, lights low. Children who do not sleep rest quietly with books until the room wakes up.",
    accent: "mauve",
  },
  {
    part: "Snack and free play",
    time: "Afternoon",
    body: "An afternoon snack, then the indoor play room with its two-story playhouse, or back outside if it is a good day.",
    accent: "gold",
  },
  {
    part: "Pick-up",
    time: "Until 5:30 p.m.",
    body: "Unwinding, a last story, and a word with your child's teacher about how the day actually went.",
    accent: "coral",
  },
] as const;

/* ============================================================
   Program activities & special events
   Source: /why-choose-us, verbatim.
   ============================================================ */

export const activities = [
  "Playroom activities",
  "Outdoor recreation",
  "Craft projects",
  "Special events",
  "Story time",
  "Music",
  "Art activities",
  "Block building",
  "Manipulative toys",
  "Visitors from the community",
  "Nutritional snacks and lunch",
  "Nap time",
] as const;

export const specialEvents = [
  "Valentine's Day Party",
  "Halloween Carnival",
  "Easter Egg Hunt",
  "Thanksgiving Feast",
  "Summer Water Play",
  "A visit from Santa",
] as const;

/* Practical answers parents actually ask for. All four are documented on the
   current site — the pull-ups line in particular is on /why-choose-us and has
   never had a home in the redesign until now. */
export const goodToKnow = [
  {
    q: "Does my child need to be potty trained?",
    a: "No. Children who are not potty trained may wear pull-ups. Plenty of our two year olds start out that way.",
  },
  {
    q: "Do I need an appointment to visit?",
    a: "Never. Parents are welcome at Kids & Me at any time during normal operating hours, with no advance notification.",
  },
  {
    q: "Do I have to send my child every day?",
    a: "No. Scheduling is flexible and available year round, and the daily rate is the same however many days a week your child attends.",
  },
  {
    q: "What about meals?",
    a: "Nutritious hot lunches and snacks are included. There is no cooler to pack.",
  },
] as const;

/* ============================================================
   Staff
   TODO(client): section 5 of the scope has the client supplying headshots and
   short bios. Nothing has been received, so these are role placeholders — the
   page is designed and ready, and each card fills in as content arrives.
   "Teacher Pam" is the one name documented anywhere public: she is named in
   Tricia's testimonial on the current Applause page.
   ============================================================ */

export type StaffMember = {
  name: string | null;
  role: string;
  room: string | null;
  bio: string | null;
  accent: string;
};

export const staff: StaffMember[] = [
  {
    name: null,
    role: "Director",
    room: null,
    bio: null,
    accent: "coral",
  },
  {
    name: null,
    role: "Lead Teacher",
    room: "Toddler Room · Ages 2 & 3",
    bio: null,
    accent: "teal",
  },
  {
    name: "Teacher Pam",
    role: "Lead Teacher",
    room: "Pre-K One · Age 4",
    bio: "Named by more than one parent in our reviews. Her Pre-K classroom is where the alphabet, pencil grip and circle-time listening all come together.",
    accent: "gold",
  },
  {
    name: null,
    role: "Lead Teacher",
    room: "Pre-K Two · Age 5",
    bio: null,
    accent: "mauve",
  },
  {
    name: null,
    role: "Assistant Teacher",
    room: null,
    bio: null,
    accent: "teal",
  },
  {
    name: null,
    role: "Kitchen & Nutrition",
    room: null,
    bio: null,
    accent: "coral",
  },
];

/* ============================================================
   Gallery
   Categories mirror the four the current site uses.
   ============================================================ */

export const galleryCategories = [
  {
    slug: "playground",
    label: "Playground",
    blurb: "A shady, park-like outdoor area with mature oaks.",
    count: 13,
    prefix: "gallery-playground-redding-preschools",
  },
  {
    slug: "classrooms",
    label: "Classrooms",
    blurb: "Three rooms, grouped by age.",
    count: 7,
    prefix: "gallery-classroom-redding-preschools",
  },
  {
    slug: "playroom",
    label: "Playroom",
    blurb: "The indoor play room and its two-story playhouse.",
    count: 7,
    prefix: "gallery-playroom-redding-preschools",
  },
  {
    slug: "lunchroom",
    label: "Lunchroom",
    blurb: "Where the hot lunches happen.",
    count: 2,
    prefix: "gallery-lunchroom-redding-preschools",
  },
] as const;

export type GalleryPhoto = { src: string; alt: string; category: string };

export const galleryPhotos: GalleryPhoto[] = galleryCategories.flatMap((c) =>
  Array.from({ length: c.count }, (_, i) => ({
    src: `/images/${c.prefix}-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `${c.label} at Kids & Me Preschool`,
    category: c.slug,
  })),
);

/* ============================================================
   What the school offers — the About Us bullet list, verbatim.
   ============================================================ */

export const offerings = [
  "Full day and half day, ages 2–6",
  "Reasonable rates and flexible scheduling, year round",
  "Nutritious lunches and snacks",
  "Qualified and experienced teachers",
  "A safe, happy and challenging environment",
  "A clean facility, designed for the young child",
  "A shady, park-like setting with spacious outdoor play",
  "A large indoor play room with a two-story play house",
] as const;
