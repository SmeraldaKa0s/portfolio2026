import { Playfair_Display } from "next/font/google";
import { Column, Row, Text, Line, RevealFx, SmartLink } from "@once-ui-system/core";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface Article {
  title: string;
  source: string;
  category: string;
  date: string;
  url: string;
  excerpt: string;
}

const articles: Article[] = [
  {
    title: "How AI Is Reshaping the Role of the Product Designer",
    source: "Harvard Business Review",
    category: "AI & Design",
    date: "Apr 2026",
    url: "#",
    excerpt:
      "The convergence of artificial intelligence and design thinking is creating a new paradigm where designers become orchestrators of intelligent systems.",
  },
  {
    title: "Beyond Prompts: Designing Human-AI Collaboration Patterns",
    source: "Nielsen Norman Group",
    category: "UX Research",
    date: "Mar 2026",
    url: "#",
    excerpt:
      "New interaction patterns are emerging that go beyond simple prompt-and-response, enabling richer collaboration between humans and AI systems.",
  },
  {
    title: "The Ethics of Generative Design: A Framework for Responsible AI",
    source: "MIT Technology Review",
    category: "Ethics",
    date: "Mar 2026",
    url: "#",
    excerpt:
      "As AI-generated content becomes ubiquitous, designers must adopt ethical frameworks that ensure transparency, attribution, and human oversight.",
  },
  {
    title: "Data-Informed Design: Moving Beyond Gut Feelings",
    source: "A List Apart",
    category: "Design Strategy",
    date: "Feb 2026",
    url: "#",
    excerpt:
      "Combining quantitative data with qualitative insights creates a more robust foundation for design decisions that scale.",
  },
  {
    title: "Designing for Agency: Keeping Humans in the Loop",
    source: "Interaction Design Foundation",
    category: "AI & Design",
    date: "Feb 2026",
    url: "#",
    excerpt:
      "The best AI-augmented products are those that amplify human capability without removing human agency from critical decisions.",
  },
  {
    title: "The New Design Stack: Figma, AI, and the Future of Prototyping",
    source: "Smashing Magazine",
    category: "Tools",
    date: "Jan 2026",
    url: "#",
    excerpt:
      "AI-powered design tools are not replacing designers — they are eliminating the gap between ideation and implementation.",
  },
];

export default function Approach() {
  return (
    <Column maxWidth="m" fillWidth paddingY="xl">
      {/* Hero */}
      <Column fillWidth gap="m" paddingBottom="xl">
        <RevealFx translateY="4" speed={400}>
          <h1
            style={{
              fontSize: "72px",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                color: "var(--neutral-on-background-strong)",
              }}
            >
              Lecturas
            </span>{" "}
            <span
              className={playfair.className}
              style={{
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--neutral-on-background-weak)",
              }}
            >
              recientes
            </span>
          </h1>
        </RevealFx>
        <RevealFx translateY="8" speed={400} delay={0.08}>
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            style={{ maxWidth: 650 }}
          >
            Una selección de artículos, investigaciones y perspectivas sobre inteligencia artificial,
            diseño y tecnología que están definiendo el futuro de la disciplina.
          </Text>
        </RevealFx>
      </Column>

      <Line />

      {/* Articles list */}
      <Column fillWidth paddingTop="xl" gap="0">
        {articles.map((article, index) => (
          <RevealFx key={article.title} translateY="8" speed={400} delay={Math.min(0.04 * index, 0.2)}>
            <SmartLink href={article.url} style={{ textDecoration: "none", color: "inherit" }}>
              <Column fillWidth paddingY="l" gap="12">
                <Row gap="12" vertical="center">
                  <Text
                    variant="label-default-s"
                    onBackground="neutral-weak"
                    style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {article.category}
                  </Text>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    ·
                  </Text>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {article.date}
                  </Text>
                </Row>
                <Text
                  variant="heading-strong-l"
                  style={{ fontSize: "21px", lineHeight: 1.3 }}
                >
                  {article.title}
                </Text>
                <Text
                  variant="body-default-m"
                  onBackground="neutral-weak"
                  style={{ fontSize: "16px", lineHeight: 1.6 }}
                >
                  {article.excerpt}
                </Text>
                <Text
                  variant="label-default-s"
                  onBackground="neutral-weak"
                  style={{ fontStyle: "italic" }}
                >
                  {article.source}
                </Text>
              </Column>
            </SmartLink>
            <Line />
          </RevealFx>
        ))}
      </Column>
    </Column>
  );
}
