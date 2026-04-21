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
        style={{ minHeight: "85vh", alignItems: "stretch" }}
      >
        {/* Left: intro text + CTA — vertically centered */}
        <Column
          flex={5}
          gap="xl"
          vertical="center"
          style={{ justifyContent: "center" }}
        >
          <RevealFx translateY="4" speed={400}>
            <Text
              variant="heading-default-l"
              onBackground="neutral-weak"
              className={playfair.className}
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.5 }}
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
              <div style={{ width: 590, maxWidth: "100%", height: 665, position: "relative" }}>
                <Media
                  radius="l"
                  alt={person.name}
                  src={person.avatar}
                  sizes="590px"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
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
                <Text
                  variant="display-default-xs"
                  onBackground="neutral-weak"
                  className={playfair.className}
                  style={{ fontStyle: "italic" }}
                >
                  tldr:
                </Text>
                <Heading
                  as="h2"
                  variant="display-strong-l"
                  className={playfair.className}
                >
                  From libraries to interfaces
                </Heading>
              </Column>

              <Column gap="l">
                <Text onBackground="neutral-weak" variant="body-default-l">
                  {about.intro.description}
                </Text>
                <Text onBackground="neutral-weak" variant="body-default-l">
                  I work as a user advocate, focused on strategic and meaningful experiences. Mi práctica vive en la intersección de research, prototipado y diseño iterativo — del primer concepto al producto en producción.
                </Text>
                <Text onBackground="neutral-weak" variant="body-default-l">
                  Mi camino al diseño no fue directo. Empecé en Bibliotecología — donde el usuario también es el centro. Durante la Licenciatura en Artes Electrónicas trabajé con equipos multidisciplinarios haciendo research, market research y UX research para ayudar a clientes a patentar productos innovadores. En el camino sumé frontend, que me enseñó cómo se construye lo que diseño.
                </Text>
                <Text onBackground="neutral-weak" variant="body-default-l">
                  Cuando descubrí UX/UI Design, hizo click. Adapté lo que sabía, seguí aprendiendo, y empecé a diseñar con clientes reales. Hoy profundizo en UX para productos que integran IA — los patterns que definen cómo las personas colaboran con sistemas inteligentes.
                </Text>
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
              style={{ position: "sticky", top: 100, alignSelf: "flex-start" }}
              s={{ style: { position: "relative", top: "auto" } }}
            >
              <Text
                className={playfair.className}
                style={{
                  fontSize: "34px",
                  fontStyle: "italic",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Experience
              </Text>
            </Column>

            {/* Entries */}
            <Column flex={7} gap="48">
              {about.work.experiences.map((experience, index) => (
                <Row
                  key={`${experience.company}-${experience.role}-${index}`}
                  fillWidth
                  gap="xl"
                  s={{ direction: "column" }}
                >
                  {/* Timeframe */}
                  <Column flex={3} gap="4">
                    <Text
                      onBackground="neutral-weak"
                      style={{ fontSize: "21px", lineHeight: 1.4 }}
                    >
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
              style={{ position: "sticky", top: 100, alignSelf: "flex-start" }}
              s={{ style: { position: "relative", top: "auto" } }}
            >
              <Text
                className={playfair.className}
                style={{
                  fontSize: "34px",
                  fontStyle: "italic",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Education
              </Text>
            </Column>

            <Column flex={7} gap="48">
              {about.studies.institutions.map((institution, index) => (
                <Row
                  key={`${institution.name}-${index}`}
                  fillWidth
                  gap="xl"
                  s={{ direction: "column" }}
                >
                  <Column flex={3} />
                  <Column flex={5} gap="4">
                    <Text style={{ fontSize: "21px", fontWeight: 600, lineHeight: 1.4 }}>
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
              style={{ position: "sticky", top: 100, alignSelf: "flex-start" }}
              s={{ style: { position: "relative", top: "auto" } }}
            >
              <Text
                className={playfair.className}
                style={{
                  fontSize: "34px",
                  fontStyle: "italic",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Technical skills
              </Text>
            </Column>

            <Column flex={7} gap="48">
              {about.technical.skills.map((skill, index) => (
                <Row
                  key={`${skill.title}-${index}`}
                  fillWidth
                  gap="xl"
                  s={{ direction: "column" }}
                >
                  <Column flex={3} />
                  <Column flex={5} gap="8">
                    <Text style={{ fontSize: "21px", fontWeight: 600, lineHeight: 1.4 }}>
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
              ))}
            </Column>
          </Row>
        </Column>
      )}
    </Column>
  );
}
