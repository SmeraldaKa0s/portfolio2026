"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Column,
  Heading,
  PasswordInput,
  Text,
} from "@once-ui-system/core";
import styles from "./ProjectGate.module.scss";

const PLACEHOLDER_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sagittis ut odio ac est consequat sodales.",
  "Pellentesque nec pellentesque eros. Cras ut justo at urna posuere viverra. Aenean placerat, libero a tincidunt commodo, lectus arcu lobortis nibh, ut iaculis lacus enim ut nibh. Curabitur sit amet velit nec arcu vehicula varius. Nullam volutpat purus ac mauris condimentum.",
  "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
  "Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.",
];

export function ProjectGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(undefined);
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }

      const body = await res.json().catch(() => ({}));

      switch (res.status) {
        case 401:
          setError("Clave incorrecta");
          break;
        case 429:
          setError("Demasiados intentos. Probá más tarde.");
          break;
        case 500:
          if (body?.error === "misconfigured") {
            const missing = Array.isArray(body.missing) ? body.missing.join(", ") : "";
            setError(
              missing
                ? `Falta configurar en el servidor: ${missing}.`
                : "El servidor no tiene la configuración de acceso. Avisale al admin."
            );
          } else {
            setError("Error del servidor (500)");
          }
          break;
        default:
          setError(`Error del servidor (${res.status})`);
      }
    } catch {
      setError("Error de red");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Column
        as="article"
        maxWidth="xs"
        gap="m"
        aria-hidden="true"
        className={styles.placeholder}
        style={{ margin: "auto" }}
      >
        <Heading as="h2" variant="heading-strong-l">
          Lorem ipsum dolor sit amet
        </Heading>
        {PLACEHOLDER_PARAGRAPHS.map((paragraph, idx) => (
          <Text key={idx} variant="body-default-m" onBackground="neutral-weak">
            {paragraph}
          </Text>
        ))}
      </Column>
      <Column fillWidth className={styles.overlay}>
        <form
          onSubmit={onSubmit}
          className={styles.card}
          aria-labelledby="portfolio-gate-title"
          aria-describedby="portfolio-gate-description"
          noValidate
        >
          <div className={styles.kicker} aria-hidden="true">
            <span className={styles.kickerRule} />
            <span className={styles.kickerLabel}>Acceso restringido</span>
          </div>
          <div className={styles.headingBlock}>
            <Heading
              as="h2"
              id="portfolio-gate-title"
              variant="display-strong-xs"
              wrap="balance"
            >
              Caso privado
            </Heading>
            <Text
              id="portfolio-gate-description"
              variant="body-default-s"
              onBackground="neutral-weak"
              wrap="balance"
            >
              Ingresá la clave para ver el caso completo.
            </Text>
          </div>
          <PasswordInput
            id="portfolio-access-password"
            label="Clave"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
            disabled={pending}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fillWidth
            size="l"
            variant="primary"
            suffixIcon="chevronRight"
            disabled={pending || !password}
            loading={pending}
          >
            Entrar
          </Button>
        </form>
      </Column>
    </>
  );
}
