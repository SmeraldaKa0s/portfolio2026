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
            Análisis, diseño e implementación de nuevos flujos en la vertical de última milla, alineados a objetivos de negocio y mejora continua de la operación.
          </>,
          <>
            Autonomía end-to-end: research, definición de flujos, wireframes, UI y prototipado. Colaboración activa en discovery y delivery junto a producto, negocio, desarrollo y operaciones.
          </>,
          <>
            Gestión y evolución del design system: estandarización de componentes, autolayout, estructuración lógica de capas y reducción de deuda técnica heredada.
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
            Diseño de productos digitales en fintech, salud y gaming. Dirección de procesos de research, flujos, wireframes, UI y prototipado.
          </>,
          <>
            Redefinición e implementación de procesos de diseño alineados a objetivos de producto y negocio, en trabajo interdisciplinario con desarrollo y dirección (CEO/CTO).
          </>,
          <>
            Desarrollo de design systems y criterios de consistencia visual para escalar productos en aplicaciones y web responsive.
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
            Diseño de sitios desde cero, rediseño de apps existentes e identidad visual para marcas emergentes. Interfaces con foco en valor diferencial y coherencia visual.
          </>,
          <>
            Prototipado de MVPs en Framer y desarrollo frontend en React, Next.js y Sass, con foco en responsive y accesibilidad.
          </>,
          <>
            Análisis competitivo para detectar oportunidades de innovación; adaptación tecnológica según las necesidades de cada proyecto.
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
            Diseño e iteración del MVP de una plataforma e-learning desde una perspectiva full-stack, partiendo de research y conceptualización UX.
          </>,
          <>
            Documentación técnica, manuales de usuario y QA funcional en ciclos iterativos, aportando desde lo técnico a decisiones de producto y diseño.
          </>,
          <>
            Stack: React, Next.js, MySQL, Node.js, Docker, Postman.
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
        name: "Universidad Nacional de Tres de Febrero",
        description: <>Licenciatura en Artes Electrónicas — programación para aplicaciones específicas, arte y ciencia. 2020 — 2025.</>,
      },
      {
        name: "Ada ITW",
        description: <>Frontend Developer. 2021 — 2022.</>,
      },
      {
        name: "Instituto Superior de Formación Técnica N°225",
        description: <>Bibliotecología y Ciencia de la Información. 2018 — 2020.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Prototipado y sistemas de diseño en Figma. Foco en autolayout, estandarización de componentes y escalabilidad — diseñar para que el sistema sobreviva al próximo handover.</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        images: [],
      },
      {
        title: "Frontend",
        description: (
          <>Desarrollo en React, Next.js y Sass. Me siento cómoda puenteando diseño y código — entender cómo se construye cambia cómo diseño.</>
        ),
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
        ],
        images: [],
      },
      {
        title: "AI product design",
        description: (
          <>Diseño de interfaces para productos con IA integrada y experiencias agent-first. Certificada en Anthropic agent skills, Key Concepts Machine Learning, y UX Research Generativo: de la data a la acción.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "UX Research",
        description: (
          <>Investigación cualitativa, card sorting, encuestas y guerrilla research. Triangulación de datos de usuarios, mercado y academia para validar soluciones en contextos reales.</>
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
