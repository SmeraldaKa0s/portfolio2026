import {
  Column,
  Schema,
  Meta,
  RevealFx,
} from "@once-ui-system/core";
import { Gloock } from "next/font/google";
import { home, about, person, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { HeroHeadline } from "@/components/HeroHeadline";
import { HeroWatermark } from "@/components/HeroWatermark";
import { FloatingStickers } from "@/components/FloatingStickers";
import { GrainOverlay } from "@/components/GrainOverlay";
import homeStyles from "./home.module.scss";

const gloock = Gloock({
  variable: "--font-display",
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

      <section
        className={gloock.variable}
        aria-labelledby="hero-heading"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "clamp(28px, 4.5vh, 56px)",
          paddingTop: "clamp(72px, 11vh, 128px)",
          paddingBottom: "clamp(40px, 7vh, 80px)",
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        <HeroWatermark character="A" />
        <FloatingStickers />
        <GrainOverlay opacity={0.04} blendMode="overlay" zIndex={1} />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: "clamp(20px, 3vw, 40px)",
            alignItems: "end",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <RevealFx translateY="8" speed={600} delay={0.15}>
              <div id="hero-heading">
                <HeroHeadline
                  anchorWord="Designer"
                  rotatingWords={["Product", "IA", "UX/UI"]}
                />
              </div>
            </RevealFx>
          </div>
        </div>

        <div className={homeStyles.heroSubGrid}>
          <div className={homeStyles.heroSubSpacer} />

          <div className={homeStyles.heroSubContent}>
            <RevealFx translateY="8" speed={500} delay={0.4}>
              <p
                style={{
                  fontSize: "clamp(15px, 1.5vw, 19px)",
                  fontWeight: 400,
                  fontStyle: "normal",
                  lineHeight: 1.55,
                  color: "var(--neutral-on-background-weak)",
                  margin: 0,
                  maxWidth: "38ch",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "-0.003em",
                }}
              >
                Designing products that give you competitive advantage combining human-centered strategy, data, and AI.
              </p>
            </RevealFx>

            <RevealFx translateY="8" speed={500} delay={0.55}>
              <a
                href={about.path}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  fontSize: "1rem",
                  color: "var(--neutral-on-background-strong)",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "-0.005em",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--neutral-on-background-strong)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                Read my story
              </a>
            </RevealFx>
          </div>
        </div>
      </section>

      <RevealFx translateY="16" speed={400} delay={0.16} fillWidth>
        <Projects />
      </RevealFx>
    </Column>
  );
}
