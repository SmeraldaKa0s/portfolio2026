"use client";

import {
  Carousel,
  Column,
  Heading,
  Text,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  description,
}) => {
  const router = useRouter();

  return (
    <Column
      fillWidth
      gap="12"
      className={styles.card}
      onClick={() => router.push(href)}
      style={{ cursor: "pointer" }}
    >
      <Carousel
        sizes="(max-width: 960px) 100vw, 460px"
        border="transparent"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
      <Column fillWidth paddingX="4" paddingTop="4" paddingBottom="8" gap="4">
        {title && (
          <Heading as="h2" wrap="balance" variant="heading-strong-m">
            {title}
          </Heading>
        )}
        {description?.trim() && (
          <Text wrap="balance" variant="body-default-xs" onBackground="neutral-weak">
            {description}
          </Text>
        )}
      </Column>
    </Column>
  );
};
