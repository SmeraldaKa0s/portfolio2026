import {
  AvatarGroup,
  Column,
  Heading,
  Media,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

interface ProjectShellProps {
  title: string;
  cover?: string;
  blurCover?: boolean;
  publishedAt?: string;
  team?: Team[];
  children: React.ReactNode;
}

export function ProjectShell({
  title,
  cover,
  blurCover = false,
  publishedAt,
  team,
  children,
}: ProjectShellProps) {
  const avatars = team?.map((member) => ({ src: member.avatar })) ?? [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l" marginTop="xl">
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        {publishedAt && (
          <Text
            variant="body-default-xs"
            onBackground="neutral-weak"
            marginBottom="12"
          >
            {formatDate(publishedAt)}
          </Text>
        )}
        <Heading variant="display-strong-m">{title}</Heading>
      </Column>
      {team && team.length > 0 && (
        <Row marginBottom="32" horizontal="center">
          <Row gap="16" vertical="center">
            <AvatarGroup reverse avatars={avatars} size="s" />
            <Text variant="label-default-m" onBackground="brand-weak">
              {team.map((member, idx) => (
                <span key={idx}>
                  {idx > 0 && (
                    <Text as="span" onBackground="neutral-weak">
                      ,{" "}
                    </Text>
                  )}
                  <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                </span>
              ))}
            </Text>
          </Row>
        </Row>
      )}
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
