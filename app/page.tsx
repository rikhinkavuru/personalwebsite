import Link from "next/link";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import Postcard from "@/components/Postcard";
import ProfileHeader from "@/components/ProfileHeader";
import { Badge, Row, SectionHeading } from "@/components/Rows";
import Socials from "@/components/Socials";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { hasPublicFile } from "@/lib/assets";
import { experience, footer, postcards, projects, research } from "@/lib/content";

// Only the ongoing roles on the home page; the rest live behind the link.
const featuredExperience = experience.filter((job) => job.current);

// Resolved at build time. Rendering a postcard whose file is missing and then
// removing it on mount reflowed the paragraph mid-animation, which is what
// made the whole load sequence stutter.
const showFortWayne = hasPublicFile(postcards.fortWayne.thumb);
const showBoston = hasPublicFile(postcards.boston.thumb);

export default function Home() {
  return (
    <>
      <main className="mx-auto w-full max-w-[660px] flex-1 px-4 pt-16 sm:px-6 sm:pt-24">
        <ProfileHeader />

        <Stagger>
          {/* PLACEHOLDER COPY. Deliberately short and personal so the postcards
              carry it, rather than restating the Experience list below. */}
          <StaggerItem as="section" className="pt-6">
            <div className="flex flex-col gap-4 text-base leading-[1.66] text-primary">
              <p>
                I&apos;m 17. I grew up in{" "}
                <span className="whitespace-nowrap">
                  Fort Wayne, Indiana
                  {showFortWayne && <Postcard card={postcards.fortWayne} />}
                </span>{" "}
                and spend most of my time teaching machines to read biology.
              </p>

              <p>
                The rest of it goes to tennis, arguing about benchmarks, and
                flights to{" "}
                <span className="whitespace-nowrap">
                  Cambridge
                  {showBoston && <Postcard card={postcards.boston} />}
                </span>
                .
              </p>
            </div>
          </StaggerItem>

          <StaggerItem className="mt-6">
            <Socials />
          </StaggerItem>

          <StaggerItem as="section" className="pt-14">
            <SectionHeading>Experience</SectionHeading>
            <div className="flex flex-col">
              {featuredExperience.map((job) => (
                <Row
                  key={job.org}
                  title={job.org}
                  subtitle={job.role}
                  detail={job.detail}
                  mark={job.mark}
                  href={job.href}
                  logoSize={64}
                  badge={<Badge solid={job.current}>{job.when}</Badge>}
                />
              ))}
              <SeeAll href="/experience">View all roles</SeeAll>
            </div>
          </StaggerItem>

          <StaggerItem as="section" className="pt-14">
            <SectionHeading>Projects</SectionHeading>
            <BentoGrid projects={projects} />
          </StaggerItem>

          <StaggerItem as="section" className="pt-14">
            <SectionHeading>Research</SectionHeading>
            <div className="flex flex-col">
              {research.slice(0, 2).map((paper) => (
                <Row
                  key={paper.title}
                  title={paper.venue}
                  detail={paper.title}
                  href={paper.href}
                  badge={
                    <Badge solid={Boolean(paper.note)}>
                      {paper.note ?? paper.track.replace(" track", "")}
                    </Badge>
                  }
                />
              ))}
              <SeeAll href="/research">All {research.length} papers</SeeAll>
            </div>
          </StaggerItem>

          <StaggerItem className="pt-14">
            <p className="text-sm text-muted">{footer.lineOne}</p>
          </StaggerItem>
        </Stagger>
      </main>

      <Footer />
    </>
  );
}

function SeeAll({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-2 inline-flex w-fit items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-primary"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
    </Link>
  );
}

export const dynamic = "force-static";
