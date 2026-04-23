import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import { Meta, Schema, Column, Row, Text, Line, Media } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import styles from "./slug.module.scss";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

/** Split MDX body into sections by ## headings */
function parseSections(content: string): { title: string; body: string }[] {
  // Normalize \r\n to \n for consistent regex matching
  const normalized = content.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const sections: { title: string; body: string }[] = [];
  let currentTitle = "";
  let currentBody: string[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)/);
    if (h2Match) {
      if (currentTitle || currentBody.length > 0) {
        sections.push({ title: currentTitle, body: currentBody.join("\n").trim() });
      }
      currentTitle = h2Match[1].trim();
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  if (currentTitle || currentBody.length > 0) {
    sections.push({ title: currentTitle, body: currentBody.join("\n").trim() });
  }

  return sections;
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const sections = parseSections(post.content);

  return (
    <>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column as="section" maxWidth="m" horizontal="center" gap="l" marginTop="xl" fillWidth>
        {/* Project title */}
        <Column maxWidth="m" gap="16" paddingBottom="l">
          <Text
            as="h1"
            className={`${playfair.className} ${styles.projectTitle}`}
          >
            {post.metadata.title}
          </Text>
        </Column>

        {/* Cover image */}
        {post.metadata.images[0] && (
          <Media
            priority
            aspectRatio="16 / 9"
            radius="xl"
            alt=""
            src={post.metadata.images[0]}
          />
        )}

        {/* Sections with sticky titles */}
        {sections.map((section, index) => (
          <Column key={index} fillWidth paddingY="l">
            {index > 0 && <Line marginBottom="xl" />}

            <Row fillWidth gap="xl" s={{ direction: "column" }}>
              {/* Sticky title — left column */}
              <Column
                flex={3}
                style={{ position: "sticky", top: 100, alignSelf: "flex-start" }}
                s={{ style: { position: "relative", top: "auto" } }}
              >
                {section.title && (
                  <Text
                    className={`${playfair.className} ${styles.sectionTitle}`}
                  >
                    {section.title}
                  </Text>
                )}
              </Column>

              {/* Scrolling content — right column */}
              <Column flex={7} gap="m" as="article">
                {section.body && (
                  <CustomMDX source={section.body} />
                )}
              </Column>
            </Row>
          </Column>
        ))}
        <ScrollToHash />
      </Column>
    </>
  );
}
