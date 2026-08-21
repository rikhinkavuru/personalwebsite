import Link from "next/link";
import Footer from "@/components/Footer";
import { MarkedName } from "@/components/Mark";
import NowPlaying from "@/components/NowPlaying";
import Postcard from "@/components/Postcard";
import ProfileHeader from "@/components/ProfileHeader";
import Reveal from "@/components/Reveal";
import { Badge, Row, SectionHeading } from "@/components/Rows";
import Socials from "@/components/Socials";
import {
  experience,
  footer,
  leadership,
  postcards,
  projects,
  recognition,
  research,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <main className="mx-auto w-full max-w-[660px] flex-1 px-4 pt-16 sm:px-6 sm:pt-24">
        <ProfileHeader />

        <section className="pt-6">
          <div className="flex animate-fly-in flex-col gap-4 text-base leading-[1.66] text-primary [animation-delay:80ms]">
            <p>
              I build machine learning for biology. Right now that means{" "}
              <MarkedName name="convexia" label="Convexia" />, where I train
              models that predict whether a drug asset will survive its clinical
              trial, and the{" "}
              <MarkedName name="broad" label="Broad Institute" />, where I work
              on ML methods for drug design and phylogenetics.
            </p>

            <p>
              I&apos;m 17, based in{" "}
              <span className="whitespace-nowrap">
                Fort Wayne, Indiana
                <Postcard card={postcards.fortWayne} delay={150} />
              </span>{" "}
              for now, and most weeks I&apos;m somewhere between a wet lab, a
              cluster, and a flight to{" "}
              <span className="whitespace-nowrap">
                Cambridge
                <Postcard card={postcards.boston} delay={180} />
              </span>
              . Most of my time goes into benchmarks nobody trusts yet, or into
              shipping something small and fast enough to be useful this week.
            </p>
          </div>

          <div className="mt-6 animate-fly-in [animation-delay:140ms]">
            <Socials />
          </div>

          <div className="mt-4 animate-fly-in [animation-delay:200ms]">
            <NowPlaying />
          </div>
        </section>

        <Section title="Experience" delay={0}>
          {experience.map((job) => (
            <Row
              key={job.org}
              title={job.org}
              subtitle={job.role}
              detail={job.detail}
              mark={job.mark}
              badge={<Badge solid={job.current}>{job.when}</Badge>}
            />
          ))}
        </Section>

        <Section title="Building">
          {projects.map((project) => (
            <Row
              key={project.slug}
              title={project.name}
              detail={project.detail}
              mark={project.mark}
              href={`/projects/${project.slug}`}
              badge={<Badge solid={project.current}>{project.role}</Badge>}
            />
          ))}
          <SeeAll href="/projects">All projects</SeeAll>
        </Section>

        <Section title="Research">
          {research.slice(0, 2).map((paper) => (
            <Row
              key={paper.title}
              title={paper.venue}
              detail={paper.title}
              href={paper.href}
              badge={<Badge>{paper.note ?? paper.track.replace(" track", "")}</Badge>}
            />
          ))}
          <SeeAll href="/research">
            All {research.length} papers
          </SeeAll>
        </Section>

        <Section title="Leading">
          {leadership.map((role) => (
            <Row
              key={role.org}
              title={role.org}
              detail={role.detail}
              mark={role.mark}
              href={role.href}
              badge={<Badge>{role.title}</Badge>}
            />
          ))}
        </Section>

        <Section title="Recognition">
          <ul className="flex flex-col gap-2.5">
            {recognition.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={
                    item.primary
                      ? "size-1.5 shrink-0 rounded-full bg-primary"
                      : "size-1.5 shrink-0 rounded-full border border-muted"
                  }
                />
                <span className="text-base text-primary">{item.label}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Reveal className="pt-14">
          <p className="text-sm text-muted">{footer.lineOne}</p>
          <p className="text-sm text-muted">{footer.lineTwo}</p>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}

function Section({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section className="pt-14">
      <Reveal delay={delay}>
        <SectionHeading>{title}</SectionHeading>
      </Reveal>
      <Reveal delay={delay + 0.05}>
        <div className="flex flex-col">{children}</div>
      </Reveal>
    </section>
  );
}

function SeeAll({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-2 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-primary"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
    </Link>
  );
}

export const dynamic = "force-static";
