import {
  Column,
  Schema,
  Meta,
  RevealFx,
} from "@once-ui-system/core";
import { Playfair_Display } from "next/font/google";
import { home, about, person, baseURL } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
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

      {/* Description hero — 60px, centered */}
      <Column fillWidth paddingY="xl" gap="l" horizontal="center">
        <RevealFx translateY="4" fillWidth horizontal="center">
          <h1
            style={{
              fontSize: "60px",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--neutral-on-background-weak)",
              letterSpacing: "-0.02em",
              maxWidth: "950px",
              margin: 0,
              textAlign: "center",
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
            <span className={playfair.className} style={{ fontWeight: 400 }}>
              is a {person.role}. {home.subline}
            </span>
          </h1>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2}>
          <a
            href={about.path}
            style={{
              display: "flex",
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
      <RevealFx translateY="16" delay={0.4} fillWidth>
        <Projects />
      </RevealFx>
      <Mailchimp />
    </Column>
  );
}
