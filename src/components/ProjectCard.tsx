"use client";

import {
  Carousel,
  Column,
  Flex,
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
  content,
  description,
}) => {
  const router = useRouter();

  return (
    <Column
      fillWidth
      gap="m"
      className={styles.card}
      onClick={() => router.push(href)}
      style={{ cursor: "pointer" }}
    >
      <Carousel
        sizes="(max-width: 960px) 100vw, 460px"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="8"
        paddingBottom="16"
        gap="8"
      >
        {title && (
          <Heading as="h2" wrap="balance" variant="heading-strong-l">
            {title}
          </Heading>
        )}
        {description?.trim() && (
          <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
            {description}
          </Text>
        )}
      </Flex>
    </Column>
  );
};
