import {
  Column,
  Schema,
  Meta,
  RevealFx,
} from "@once-ui-system/core";
import { Playfair_Display } from "next/font/google";
import { home, about, person, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Description hero — full viewport, centered */}
      <Column fillWidth gap="l" horizontal="center" vertical="center" style={{ maxWidth: "600px", margin: "0 auto", minHeight: "100vh" }}>
        <RevealFx translateY="4" speed={400} fillWidth>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 400,
              lineHeight: 1.25,
              color: "var(--neutral-on-background-weak)",
              letterSpacing: "-0.01em",
              margin: 0,
              textAlign: "justify",
            }}
          >
            <strong
              style={{
                fontWeight: 500,
                color: "var(--neutral-on-background-strong)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {person.firstName}
            </strong>{" "}
            <span
              className={playfair.className}
              style={{ fontWeight: 400, fontStyle: "italic" }}
            >
              is a full-stack designer, devoted to designing products that give you competitive advantage combining human-centered strategy, data, and AI.
            </span>
          </h1>
        </RevealFx>
        <RevealFx translateY="8" speed={400} delay={0.08} fillWidth>
          <a
            href={about.path}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              fontSize: "1.125rem",
              color: "var(--neutral-on-background-strong)",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--neutral-on-background-strong)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            Read my story
          </a>
        </RevealFx>
      </Column>

      {/* All Projects */}
      <RevealFx translateY="16" speed={400} delay={0.16} fillWidth>
        <Projects />
      </RevealFx>
    </Column>
  );
}
