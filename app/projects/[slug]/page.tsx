import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { LogoTile } from "@/components/Mark";
import ProfileHeader from "@/components/ProfileHeader";
import Reveal from "@/components/Reveal";
import TocRail from "@/components/TocRail";
import { projects } from "@/lib/content";
import { siteName } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} · ${siteName}`,
    description: project.detail,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const sections = project.sections ?? [];

  return (
    <>
      <TocRail
        backHref="/projects"
        backLabel="Projects"
        items={sections.map((s) => ({ id: s.id, label: s.heading }))}
      />

      <main className="mx-auto w-full max-w-[660px] flex-1 px-4 pt-16 sm:px-6 sm:pt-24">
        <ProfileHeader
          crumbs={[
            { label: "Projects", href: "/projects" },
            { label: project.name },
          ]}
        />

        <article className="pt-10">
          <Reveal>
            <div className="flex items-center gap-4">
              <LogoTile name={project.mark} label={project.name} size={56} />
              <div className="min-w-0">
                <h2 className="font-display text-4xl font-semibold text-primary">
                  {project.name}
                </h2>
                <p className="mt-1 text-base text-muted">
                  {project.role} · {project.when}
                </p>
              </div>
            </div>

            {project.tags?.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-lg border border-primary px-2.5 py-1 text-sm font-medium text-primary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-6 text-base leading-[1.66] text-primary">
              {project.detail}
            </p>

            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-base font-medium text-bg transition-opacity hover:opacity-80"
              >
                Visit {project.name}
                <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </Reveal>

          {sections.map((section, i) => (
            <Reveal key={section.id} delay={0.04 * i} className="pt-12">
              <section id={section.id} className="scroll-mt-28">
                <h3 className="mb-4 font-display text-2xl font-semibold text-primary">
                  {section.heading}
                </h3>

                <div className="flex flex-col gap-4">
                  {section.paragraphs.map((text, j) => (
                    <p
                      key={j}
                      className="text-base leading-[1.66] text-primary"
                    >
                      {text}
                    </p>
                  ))}
                </div>

                {section.image && (
                  <figure className="mt-6">
                    <div className="overflow-hidden rounded-xl bg-foreground">
                      <Image
                        src={section.image.src}
                        alt={section.image.alt}
                        width={1320}
                        height={880}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                    {section.image.caption && (
                      <figcaption className="mt-2 text-sm text-muted">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </section>
            </Reveal>
          ))}

          {project.stats?.length ? (
            <Reveal className="pt-12">
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-foreground p-4"
                  >
                    <dt className="font-display text-2xl font-semibold text-primary">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-primary">
                      {stat.label}
                    </dd>
                    {stat.detail && (
                      <dd className="mt-0.5 text-xs text-muted">
                        {stat.detail}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </article>
      </main>

      <Footer />
    </>
  );
}
