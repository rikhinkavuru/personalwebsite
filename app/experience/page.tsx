import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { Badge, Row } from "@/components/Rows";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { experience } from "@/lib/content";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `Experience · ${siteName}`,
  description:
    "Roles Rikhin Kavuru has held across machine learning and computational biology.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[660px] flex-1 px-4 pt-16 sm:px-6 sm:pt-24">
        <ProfileHeader crumbs={[{ label: "Experience" }]} />

        <Stagger className="pt-10">
          <StaggerItem>
            <h2 className="font-display text-3xl font-semibold text-primary">
              Experience
            </h2>
            <p className="mt-2 text-base text-muted">
              Everywhere I&apos;ve worked, current first.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-8">
            <div className="flex flex-col">
              {experience.map((job) => (
                <Row
                  key={job.org}
                  title={job.org}
                  subtitle={job.role}
                  detail={job.detail}
                  mark={job.mark}
                  href={job.href}
                  logoSize={48}
                  badge={<Badge solid={job.current}>{job.when}</Badge>}
                />
              ))}
            </div>
          </StaggerItem>
        </Stagger>
      </main>

      <Footer />
    </>
  );
}
