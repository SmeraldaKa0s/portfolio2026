import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
  Row,
  Line,
  Media,
  Icon,
  RevealFx,
} from "@once-ui-system/core";
import { Playfair_Display } from "next/font/google";
import { baseURL, about, person } from "@/resources";
import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FloatingAvatar } from "@/components/about/FloatingAvatar";
import { HeroScrollProgress } from "@/components/about/HeroScrollProgress";
import styles from "./about.module.scss";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return (
    <Column maxWidth="m" fillWidth>
      <HeroScrollProgress />
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* ——— Section 1: Intro with text left + avatar right ——— */}
      <Row
        fillWidth
        gap="xl"
        paddingY="xl"
        s={{ direction: "column" }}
        style={{ minHeight: "85vh", alignItems: "end" }}
      >
        {/* Left: intro text + CTA — aligned to bottom */}
        <Column
          flex={5}
          gap="32"
          vertical="end"
          style={{ justifyContent: "flex-end", paddingBottom: "80px" }}
        >
          <RevealFx translateY="4" speed={400}>
            <Text
              variant="heading-default-l"
              onBackground="neutral-weak"
              className={`${playfair.className} ${styles.introLead}`}
            >
              {about.intro.description}
            </Text>
          </RevealFx>
          <RevealFx translateY="8" speed={400} delay={0.08}>
            <a
              href="#story"
              className={styles.storyLink}
            >
              <span className={styles.arrowCircle}>
                <Icon name="arrowDown" size="m" className={styles.arrowIcon} />
              </span>
              This is my story
            </a>
          </RevealFx>
        </Column>

        {/* Right: avatar image — fixed size */}
        {about.avatar.display && (
          <Column
            flex={5}
            horizontal="end"
            vertical="center"
          >
            <RevealFx translateY="8" speed={400} delay={0.12}>
              <FloatingAvatar
                src={person.avatar}
                alt={person.name}
                width={590}
                height={665}
                maxRotation={-20}
              />
            </RevealFx>
          </Column>
        )}
      </Row>

      {/* ——— Section 2: Story text shifted right ——— */}
      {about.intro.display && (
        <Column fillWidth paddingY="xl" id="story">
          <Row fillWidth gap="xl" s={{ direction: "column" }}>
            <Column flex={4} s={{ hide: true }} />
            <Column flex={6} gap="xl">
              <Column gap="m">
                <Text className={styles.eyebrow}>
                  tldr
                </Text>
                <Heading
                  as="h2"
                  variant="display-strong-l"
                  className={`${playfair.className} ${styles.sectionTitle}`}
                >
                  From libraries to interfaces
                </Heading>
              </Column>

              <Column gap="l">
                <ScrollReveal>
                  <Text
                    onBackground="neutral-weak"
                    variant="body-default-l"
                    className={styles.leadParagraph}
                  >
                    My path to design wasn't direct. It started in libraries, where I learned that information only matters when someone can actually find it. That idea — that structure and context decide whether something is useful or just noise — became the through-line of everything I've done since.
                  </Text>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <Text onBackground="neutral-weak" variant="body-default-l">
                    During my degree in Electronic Arts I worked with multidisciplinary teams doing research to help clients patent innovative products. Along the way I picked up frontend development, which taught me how the things I design are actually built.
                  </Text>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <Text onBackground="neutral-weak" variant="body-default-l">
                    When I discovered UX/UI Design, it clicked. I've since designed for fintech, healthcare, gaming and logistics — currently working on systems that serve multiple audiences across Latin America, where a single design decision can ripple through operators, riders, sellers and end users at once.
                  </Text>
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                  <Text onBackground="neutral-weak" variant="body-default-l">
                    Right now I'm focused on what I believe is the most interesting shift in our field: how AI is changing the way we design and build products. I work with a design-to-code flow using Claude Code, moving from intent to production with rapid iteration and measurement built in from day one. I don't think AI replaces craft — I think it raises the bar for where craft matters.
                  </Text>
                </ScrollReveal>
                <ScrollReveal delay={0.17}>
                  <Text
                    as="blockquote"
                    className={`${playfair.className} ${styles.pullquote}`}
                  >
                    Good taste without accountability is just decoration. Good taste with accountability is leadership.
                  </Text>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <Text onBackground="neutral-weak" variant="body-default-l">
                    My practice lives at the intersection of research, prototyping and iterative design — from first concept to production. I care about the people on both sides of the interface: the ones using it and the ones building it.
                  </Text>
                </ScrollReveal>
              </Column>
            </Column>
          </Row>
        </Column>
      )}

      {/* ——— Section 3: Experience — sticky title ——— */}
      {about.work.display && (
        <Column fillWidth paddingY="xl">
          <Line marginBottom="xl" />

          <Row fillWidth gap="xl" s={{ direction: "column" }}>
            {/* Col 1: Sticky "Experience" title */}
            <Column
              flex={3}
              style={{ position: "sticky", top: 100, alignSelf: "flex-start", marginTop: "-10px" }}
              s={{ style: { position: "relative", top: "auto" } }}
              gap="12"
            >
              <Text className={styles.sectionNumber}>01 — Experience</Text>
              <Text className={`${playfair.className} ${styles.sectionTitle}`}>
                Where I've worked
              </Text>
            </Column>

            {/* Entries */}
            <Column flex={7} gap="48">
              {about.work.experiences.map((experience, index) => (
                <ScrollReveal key={`${experience.company}-${experience.role}-${index}`}>
                  <Row
                    fillWidth
                    gap="xl"
                    s={{ direction: "column" }}
                  >
                    {/* Timeframe */}
                    <Column flex={3} gap="4">
                      <Text className={styles.timeframe}>
                        {experience.timeframe}
                      </Text>
                    </Column>

                    {/* Role + Company + Description */}
                    <Column flex={5} gap="8">
                      <Text
                        variant="heading-strong-l"
                        style={{ fontSize: "21px", lineHeight: 1.4 }}
                      >
                        {experience.role}
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        style={{ fontSize: "16px", lineHeight: 1.4 }}
                      >
                        {experience.company}
                      </Text>
                      <Column as="ul" gap="8" paddingTop="8">
                        {experience.achievements.map(
                          (achievement: React.ReactNode, i: number) => (
                            <Text
                              as="li"
                              onBackground="neutral-weak"
                              key={`${experience.company}-${i}`}
                              style={{ fontSize: "16px", lineHeight: 1.6 }}
                            >
                              {achievement}
                            </Text>
                          ),
                        )}
                      </Column>
                      {experience.images && experience.images.length > 0 && (
                        <Row fillWidth paddingTop="m" gap="12" wrap>
                          {experience.images.map((image, i) => (
                            <Row
                              key={i}
                              border="neutral-medium"
                              radius="m"
                              minWidth={image.width}
                              height={image.height}
                            >
                              <Media
                                enlarge
                                radius="m"
                                sizes={image.width.toString()}
                                alt={image.alt}
                                src={image.src}
                              />
                            </Row>
                          ))}
                        </Row>
                      )}
                    </Column>
                  </Row>
                </ScrollReveal>
              ))}
            </Column>
          </Row>
        </Column>
      )}

      {/* ——— Education — sticky title ——— */}
      {about.studies.display && (
        <Column fillWidth paddingY="xl">
          <Line marginBottom="xl" />

          <Row fillWidth gap="xl" s={{ direction: "column" }}>
            <Column
              flex={3}
              style={{ position: "sticky", top: 100, alignSelf: "flex-start", marginTop: "-10px" }}
              s={{ style: { position: "relative", top: "auto" } }}
              gap="12"
            >
              <Text className={styles.sectionNumber}>02 — Education</Text>
              <Text className={`${playfair.className} ${styles.sectionTitle}`}>
                What I studied
              </Text>
            </Column>

            <Column flex={7} gap="48">
              {about.studies.institutions.map((institution, index) => (
                <ScrollReveal key={`${institution.name}-${index}`}>
                  <Row
                    fillWidth
                    gap="xl"
                    s={{ direction: "column" }}
                  >
                    <Column flex={3} gap="4">
                      {institution.timeframe && (
                        <Text className={styles.timeframe}>
                          {institution.timeframe}
                        </Text>
                      )}
                    </Column>
                    <Column flex={5} gap="4">
                      <Text
                        variant="heading-strong-l"
                        style={{ fontSize: "21px", lineHeight: 1.4 }}
                      >
                        {institution.name}
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        style={{ fontSize: "16px", lineHeight: 1.6 }}
                      >
                        {institution.description}
                      </Text>
                    </Column>
                  </Row>
                </ScrollReveal>
              ))}
            </Column>
          </Row>
        </Column>
      )}

      {/* ——— Technical skills — sticky title ——— */}
      {about.technical.display && (
        <Column fillWidth paddingY="xl">
          <Line marginBottom="xl" />

          <Row fillWidth gap="xl" s={{ direction: "column" }}>
            <Column
              flex={3}
              style={{ position: "sticky", top: 100, alignSelf: "flex-start", marginTop: "-10px" }}
              s={{ style: { position: "relative", top: "auto" } }}
              gap="12"
            >
              <Text className={styles.sectionNumber}>03 — Craft</Text>
              <Text className={`${playfair.className} ${styles.sectionTitle}`}>
                Tools &amp; skills
              </Text>
            </Column>

            <Column flex={7} gap="48">
              {about.technical.skills.map((skill, index) => (
                <ScrollReveal key={`${skill.title}-${index}`}>
                  <Row
                    fillWidth
                    gap="xl"
                    s={{ direction: "column" }}
                  >
                    <Column flex={3} />
                    <Column flex={5} gap="8">
                      <Text
                        variant="heading-strong-l"
                        style={{ fontSize: "21px", lineHeight: 1.4 }}
                      >
                        {skill.title}
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        style={{ fontSize: "16px", lineHeight: 1.6 }}
                      >
                        {skill.description}
                      </Text>
                      {skill.images && skill.images.length > 0 && (
                        <Row fillWidth paddingTop="m" gap="12" wrap>
                          {skill.images.map((image, i) => (
                            <Row
                              key={i}
                              border="neutral-medium"
                              radius="m"
                              minWidth={image.width}
                              height={image.height}
                            >
                              <Media
                                enlarge
                                radius="m"
                                sizes={image.width.toString()}
                                alt={image.alt}
                                src={image.src}
                              />
                            </Row>
                          ))}
                        </Row>
                      )}
                    </Column>
                  </Row>
                </ScrollReveal>
              ))}
            </Column>
          </Row>
        </Column>
      )}
    </Column>
  );
}
