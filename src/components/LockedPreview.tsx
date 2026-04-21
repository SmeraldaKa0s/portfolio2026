"use client";

import { Column, Heading, Media, Text } from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { HiOutlineLockClosed } from "react-icons/hi2";
import classNames from "classnames";
import styles from "./LockedPreview.module.scss";

interface LockedPreviewProps {
  href: string;
  cover?: string;
  blurCover?: boolean;
  title: string;
  summary?: string;
}

const REDACT_PATTERN = /\[\[([^\]]+)\]\]/g;

function renderRedacted(text: string) {
  const parts: (string | { redacted: string; key: number })[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  REDACT_PATTERN.lastIndex = 0;
  while ((match = REDACT_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ redacted: match[1], key: key++ });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return parts.map((part) =>
    typeof part === "string" ? (
      part
    ) : (
      <span key={part.key} className={styles.redact} aria-label="censurado">
        <span aria-hidden="true">{part.redacted}</span>
      </span>
    )
  );
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
          {blurCover && (
            <div className={styles.lockOverlay} aria-hidden="true">
              <HiOutlineLockClosed className={styles.lockGlyph} strokeWidth={1.25} />
              <span className={styles.lockLabel}>Caso privado</span>
              <span className={styles.lockHint}>Desbloquear →</span>
            </div>
          )}
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
            {renderRedacted(summary)}
          </Text>
        )}
      </Column>
    </Column>
  );
}
