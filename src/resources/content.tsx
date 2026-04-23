import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Alexandra",
  lastName: "",
  name: `Alexandra`,
  role: "Product designer",
  avatar: "/images/alexandra-image-portfolio.png",
  email: "alek.xandra.lerner@gmail.com",
  location: "Asia/Jakarta", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/alx-l/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:alek.xandra.lerner@gmail.com",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Product designer</>,
  featured: {
    display: false,
    title: <></>,
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      Full-stack designer. Estrategia human-centered y diseño orientado a negocio. Data-informed e IA-driven para soluciones escalables.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://calendly.com/alexandra-lerner/30min?back=1&month=2026-04",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hello, My name is Alexandra, and I design products that work for everyone—the people who use them, the ones who build them—creating experiences that actually matter.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Pickit",
        timeframe: "Jun 2025 — Present",
        role: "Product Designer",
        achievements: [
          <>
            End-to-end design of last-mile logistics flows, aligned with business goals and operational improvement.
          </>,
          <>
            AI-integrated design: design-to-code flow with Claude Code, iterating directly in production with measurement and A/B testing from day one.
          </>,
          <>
            Full ownership of the design process: research, flows, wireframes, UI and prototyping, collaborating with product, business, engineering and operations across discovery and delivery.
          </>,
          <>
            Design system evolution: component standardization and reduction of technical debt.
          </>,
          <>
            Coordinate design practices across the team to ensure consistency across verticals.
          </>,
        ],
        images: [],
      },
      {
        company: "Phinx Lab",
        timeframe: "Jun 2024 — Jun 2025",
        role: "UX/UI Designer",
        achievements: [
          <>
            Digital product design across fintech, healthcare and gaming.
          </>,
          <>
            Led end-to-end design process: research, flows, wireframes, UI and prototyping.
          </>,
          <>
            Redefined and implemented design processes aligned with product and business goals, collaborating with development and leadership (CEO/CTO).
          </>,
          <>
            Built design systems and visual consistency criteria to scale products across web and mobile.
          </>,
        ],
        images: [],
      },
      {
        company: "Ataway",
        timeframe: "Oct 2022 — Sep 2023",
        role: "Frontend Developer & UX Engineer",
        achievements: [
          <>
            MVP design and iteration of an e-learning platform from a full-stack perspective, from research and UX conceptualization to implementation.
          </>,
          <>
            Technical documentation, user manuals and functional QA across iterative cycles, informing product and design decisions from a technical standpoint.
          </>,
        ],
        images: [],
      },
      {
        company: "Freelance",
        timeframe: "Oct 2021 — Feb 2025",
        role: "UX/UI Engineer",
        achievements: [
          <>
            Website design from scratch, app redesigns and visual identity for emerging brands.
          </>,
          <>
            MVP prototyping in Framer and frontend development in React, Next.js and Sass, with focus on responsive and accessibility.
          </>,
          <>
            Competitive analysis to identify innovation opportunities; adapted tech stack to each project's needs.
          </>,
        ],
        images: [],
      },
      {
        company: "UNTREF",
        timeframe: "Mar 2022 — Mar 2023",
        role: "UX Researcher",
        achievements: [
          <>
            Contributed to strategic research guiding companies in tech innovation and patent development.
          </>,
          <>
            Participated in discovery sessions with stakeholders in multidisciplinary environments, triangulating user, market and academic data.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Bachelor of Arts in Electronic Arts — Arts, Sciences and Technology.",
        description: <>UNTREF</>,
        timeframe: "2020 — 2025",
      },
      {
        name: "Bootcamp in Frontend Developer",
        description: <>ADA ITW</>,
        timeframe: "2021 — 2022",
      },
      {
        name: "Library and Information Science.",
        description: <>ISFT n° 182</>,
        timeframe: "2018 — 2020",
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Design",
        description: (
          <>Figma · Design Systems · Prototyping · UI · Autolayout · Component standardization · Storybook · Design Tokens · Microcopy · Information Architecture</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "AI Product Design",
        description: (
          <>Claude Code · Design-to-code workflows · Agent-first interfaces · AI-integrated UX · Prompt engineering</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Frontend",
        description: (
          <>React · Next.js · Sass · Tailwind · HTML · CSS · JavaScript · Responsive · Accessibility · Git</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "UX Research",
        description: (
          <>Qualitative research · Card sorting · Surveys · Guerrilla research · Usability testing · Competitive analysis · Data triangulation · Desk research</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Collaboration & Process",
        description: (
          <>Discovery & delivery · Cross-functional teams · Agile (Scrum/Kanban) · Stakeholder management · Design critique · A/B testing</>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
