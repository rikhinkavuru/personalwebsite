import Link from "next/link";
import { marks, type Project } from "@/lib/content";
import FallbackImage from "./FallbackImage";

/**
 * Row spans that give the grid its bento rhythm. Cycled, so the pattern holds
 * however many projects there are.
 */
const SPANS = ["row-span-3", "row-span-2", "row-span-2", "row-span-3"];

/**
 * Two-column bento of project cards.
 *
 * A card shows the project's first screenshot when one exists. Until then it
 * falls back to the brand colour with the logo centred, which keeps the grid
 * looking deliberate rather than empty.
 */
export default function BentoGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid auto-rows-[64px] grid-cols-1 gap-3 sm:grid-cols-2">
      {projects.map((project, i) => {
        const mark = project.mark ? marks[project.mark] : undefined;
        const shot = project.shots?.[0];

        return (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`group relative block overflow-hidden rounded-xl bg-foreground ${SPANS[i % SPANS.length]}`}
            style={{ backgroundColor: mark?.fallbackBg }}
          >
            {shot ? (
              <FallbackImage
                src={shot.src}
                alt={shot.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fallback={<span />}
              />
            ) : (
              mark?.src && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <FallbackImage
                    src={mark.src}
                    alt=""
                    className="size-16 rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                    fallback={<span />}
                  />
                </span>
              )
            )}

            {/* Legibility scrim under the label, over art or flat colour alike. */}
            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent pt-10 pb-3 pl-3">
              <span className="block text-sm font-medium text-white">
                {project.name}
              </span>
              <span className="block text-xs text-white/60">
                {project.role}
                {project.current ? " · Current" : ` · ${project.when}`}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
