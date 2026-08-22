import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Badge, Row } from "@/components/Rows";
import { projects } from "@/lib/content";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `Projects · ${siteName}`,
  description: "Things Rikhin Kavuru is building.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[660px] flex-1 px-4 pt-16 sm:px-6 sm:pt-24">
        <ProfileHeader crumbs={[{ label: "Projects" }]} />

        <Stagger className="pt-10">
          <StaggerItem>
            <h2 className="font-display text-3xl font-semibold text-primary">
              Projects
            </h2>
            <p className="mt-2 text-base text-muted">
              The best way to predict the future is to invent it.

            </p>
          </StaggerItem>

          <StaggerItem className="mt-8 flex flex-col">
            {projects.map((project) => (
              <Row
                key={project.slug}
                title={project.name}
                subtitle={`${project.role} · ${project.when}`}
                detail={project.detail}
                mark={project.mark}
                href={`/projects/${project.slug}`}
                logoSize={48}
                badge={
                  project.current ? <Badge solid>Current</Badge> : undefined
                }
              />
            ))}
          </StaggerItem>
        </Stagger>
      </main>

      <Footer />
    </>
  );
}
