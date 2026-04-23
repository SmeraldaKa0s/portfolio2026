import { Row, IconButton, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
        }}
      >
        <Row gap="8" vertical="center" style={{ flexWrap: "wrap", justifyContent: "center" }}>
          <Text variant="body-default-s" onBackground="neutral-weak">© {currentYear} /</Text>
          <Text variant="body-default-s" onBackground="neutral-strong" paddingX="4">{person.name}</Text>
          <img
            src="/images/estrella-icon.png"
            alt=""
            style={{ width: 18, height: 18, filter: "brightness(0.7) saturate(1.8) hue-rotate(-10deg)" }}
          />
          <Text variant="body-default-s" onBackground="neutral-weak" style={{ textAlign: "center" }}>Startup speed. Product mindset. UX that drives outcomes.</Text>
        </Row>
        <Row gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
