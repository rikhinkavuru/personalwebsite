import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";
import { Badge } from "@/components/Rows";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { research } from "@/lib/content";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `Research · ${siteName}`,
  description:
    "Papers by Rikhin Kavuru on genomic language models, benchmark reliability, and LLM agent evaluation.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[660px] flex-1 px-4 pt-16 sm:px-6 sm:pt-24">
        <ProfileHeader crumbs={[{ label: "Research" }]} />

        <Stagger className="pt-10">
          <StaggerItem>
            <h2 className="font-display text-3xl font-semibold text-primary">
              Research
            </h2>
            <p className="mt-2 text-base text-muted">
              Mostly on whether the benchmarks we trust actually measure what we
              think they measure.
            </p>
          </StaggerItem>

          {/* One item, not one per paper: an <ol> sitting between the motion
              parent and its children would break variant propagation. */}
          <StaggerItem className="mt-8">
            <ol className="flex flex-col">
              {research.map((paper) => {
                const content = (
                  <div className="flex flex-col gap-2 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-base font-medium text-primary">
                        {paper.venue}
                      </span>
                      <Badge>{paper.track}</Badge>
                      {paper.note && <Badge solid>{paper.note}</Badge>}
                    </div>

                    <p className="text-base leading-[1.5] text-muted transition-colors group-hover:text-primary">
                      {paper.title}
                    </p>
                  </div>
                );

                return (
                  <li
                    key={paper.title}
                    className="border-b border-border last:border-b-0"
                  >
                    {paper.href ? (
                      <a
                        href={paper.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group -mx-4 block rounded-xl px-4 transition-colors hover:bg-surface-hover"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group -mx-4 px-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </StaggerItem>
        </Stagger>
      </main>

      <Footer />
    </>
  );
}
