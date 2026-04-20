"use client";

import { Column, Heading, Media, Text } from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import styles from "./LockedPreview.module.scss";

interface LockedPreviewProps {
  href: string;
  cover?: string;
  blurCover?: boolean;
  title: string;
  summary?: string;
}

export function LockedPreview({
  href,
  cover,
  blurCover = false,
  title,
  summary,
}: LockedPreviewProps) {
  const router = useRouter();

  return (
    <Column
      fillWidth
      gap="m"
      className={styles.card}
      onClick={() => router.push(href)}
    >
      {cover && (
        <div className={classNames(styles.media, blurCover && styles.mediaBlur)}>
          <Media
            sizes="(max-width: 960px) 100vw, 460px"
            aspectRatio="16 / 9"
            radius="m"
            alt=""
            src={cover}
          />
        </div>
      )}
      <Column
        fillWidth
        paddingX="s"
        paddingTop="8"
        paddingBottom="16"
        gap="8"
      >
        <Heading as="h2" wrap="balance" variant="heading-strong-l">
          {title}
        </Heading>
        {summary?.trim() && (
          <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
            {summary}
          </Text>
        )}
      </Column>
    </Column>
  );
}
