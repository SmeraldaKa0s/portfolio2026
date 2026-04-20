import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { Playfair_Display } from "next/font/google";
import styles from "./Projects.module.scss";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40">
      <h2 style={{ fontSize: "72px", lineHeight: 1.1, margin: 0, letterSpacing: "-0.02em" }}>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 500,
            color: "var(--neutral-on-background-strong)",
          }}
        >
          Selected
        </span>{" "}
        <span
          className={playfair.className}
          style={{
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--neutral-on-background-weak)",
          }}
        >
          projects
        </span>
      </h2>
      <div className={styles.grid}>
        {displayedProjects.map((post, index) => (
          <div key={post.slug} className={styles.gridItem}>
            <ProjectCard
              priority={index < 2}
              href={`/work/${post.slug}`}
              images={post.metadata.images}
              title={post.metadata.title}
              description={post.metadata.summary}
              content={post.content}
              avatars={[]}
              link={post.metadata.link || ""}
            />
          </div>
        ))}
      </div>
    </Column>
  );
}
