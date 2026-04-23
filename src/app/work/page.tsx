import {
  Column,
  Schema,
  Meta,
  RevealFx,
} from "@once-ui-system/core";
import { Playfair_Display } from "next/font/google";
import { home, about, person, baseURL, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { TextRotator } from "@/components/TextRotator";
import { FloatingStickers } from "@/components/FloatingStickers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    path: work.path,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero with text rotator + floating stickers */}
      <Column
        fillWidth
        horizontal="center"
        vertical="center"
        style={{
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <FloatingStickers />

        <Column
          gap="24"
          horizontal="center"
          style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "600px" }}
        >
          <RevealFx translateY="4" speed={400}>
            <h1
              style={{
                fontSize: "clamp(48px, 8vw, 80px)",
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                margin: 0,
                fontFamily: "var(--font-heading)",
                color: "var(--neutral-on-background-strong)",
              }}
            >
              <TextRotator
                words={["Product Designer", "IA Designer", "UX/UI Designer"]}
                interval={2500}
              />
            </h1>
          </RevealFx>

          <RevealFx translateY="8" speed={400} delay={0.08}>
            <p
              className={playfair.className}
              style={{
                fontSize: "clamp(16px, 2.2vw, 20px)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.5,
                color: "var(--neutral-on-background-weak)",
                margin: 0,
                maxWidth: "480px",
              }}
            >
              Designing products that give you competitive advantage combining human-centered strategy, data, and AI.
            </p>
          </RevealFx>

          <RevealFx translateY="8" speed={400} delay={0.12}>
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
      </Column>

      {/* All Projects */}
      <RevealFx translateY="16" speed={400} delay={0.16} fillWidth>
        <Projects />
      </RevealFx>
    </Column>
  );
}
