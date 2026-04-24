import {
  Column,
  Heading,
  Media,
} from "@once-ui-system/core";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface ProjectShellProps {
  title: string;
  cover?: string;
  blurCover?: boolean;
  children: React.ReactNode;
}

export function ProjectShell({
  title,
  cover,
  blurCover = false,
  children,
}: ProjectShellProps) {

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l" marginTop="xl">
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <Heading variant="display-strong-m" className={playfair.className}>{title}</Heading>
      </Column>
      {cover && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt=""
          src={cover}
          style={blurCover ? { filter: "blur(24px) saturate(0.7)" } : undefined}
        />
      )}
      {children}
    </Column>
  );
}
