import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Meta } from "@once-ui-system/core";
import { getPosts } from "@/utils/utils";
import { baseURL, work } from "@/resources";
import { isProtected } from "@/lib/protected-slugs";
import { ProjectShell } from "@/components/ProjectShell";
import { ProjectGate } from "@/components/ProjectGate";

const DEFAULT_LOCKED_TITLE = "Caso privado";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isProtected(slug)) return {};

  const post = getPosts(["src", "app", "work", "projects"]).find(
    (p) => p.slug === slug
  );
  if (!post) return {};

  const title = post.metadata.lockedTitle ?? DEFAULT_LOCKED_TITLE;
  const description = post.metadata.lockedSummary ?? "";
  const image = post.metadata.lockedCover;

  return Meta.generate({
    title,
    description,
    baseURL,
    image: image ?? `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: `${work.path}/${slug}`,
  });
}

export default async function GatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isProtected(slug)) notFound();

  const post = getPosts(["src", "app", "work", "projects"]).find(
    (p) => p.slug === slug
  );
  if (!post) notFound();

  const title = post.metadata.lockedTitle ?? DEFAULT_LOCKED_TITLE;
  const cover = post.metadata.lockedCover ?? post.metadata.images[0];
  const blurCover = !post.metadata.lockedCover;

  return (
    <ProjectShell title={title} cover={cover} blurCover={blurCover}>
      <ProjectGate />
    </ProjectShell>
  );
}
