import Cursor from "@/components/Cursor";
import ScrollReveal from "@/components/ScrollReveal";
import {
  experience,
  footer,
  profile,
  projects,
  recognition,
} from "@/lib/content";

const delay = (i: number) => (i === 0 ? "" : ` delay-${Math.min(i, 6)}`);

export default function Home() {
  const mailto = `mailto:${profile.email}`;

  return (
    <>
      <Cursor />
      <ScrollReveal />

      {/* Vertical column rules, desktop only */}
      <div className="fixed left-[calc(50%-400px)] top-0 bottom-0 w-px bg-rule hidden lg:block" />
      <div className="fixed right-[calc(50%-400px)] top-0 bottom-0 w-px bg-rule hidden lg:block" />

      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <header className="py-6 border-b border-rule flex items-center justify-between text-xs">
            <span className="text-muted">
              {profile.handle}
              <span className="blink text-accent">_</span>
            </span>
            <nav className="flex gap-6">
              <a href="#work" className="text-muted hover:text-ink transition-colors">
                work
              </a>
              <a href="#projects" className="text-muted hover:text-ink transition-colors">
                projects
              </a>
              <a href={mailto} className="text-accent">
                contact
              </a>
            </nav>
          </header>

          <section className="py-24 fade-up">
            <p className="text-xs text-muted mb-4">{profile.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-light mb-6">
              <span className="font-serif italic">{profile.firstName}</span>{" "}
              <span className="text-muted">{profile.lastName}</span>
            </h1>
            <p className="text-muted mb-8 leading-relaxed">
              Interested in <span className="text-accent">{profile.interests[0]}</span> and{" "}
              <span className="text-accent">{profile.interests[1]}</span>.
            </p>
            <div className="flex gap-4 text-sm">
              <a
                href={mailto}
                className="px-4 py-2 bg-ink text-bg hover:bg-accent transition-colors"
              >
                Get in touch →
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-ink hover:bg-ink hover:text-bg transition-colors"
              >
                GitHub
              </a>
            </div>
          </section>

          <section id="work" className="py-16 border-t border-rule">
            <h2 className="text-xs text-muted uppercase tracking-wider mb-8 fade-up">
              01 — Experience
            </h2>
            <div className="space-y-8">
              {experience.map((role, i) => (
                <div key={role.org} className={`fade-up${delay(i)}`}>
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h3 className="font-medium">{role.org}</h3>
                    <span
                      className={`text-xs shrink-0 ${role.current ? "text-accent" : "text-muted"}`}
                    >
                      {role.when}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{role.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="py-16 border-t border-rule">
            <h2 className="text-xs text-muted uppercase tracking-wider mb-8 fade-up">
              02 — Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project, i) => {
                const body = (
                  <>
                    <div className="flex justify-between gap-4 mb-2">
                      <h3 className="font-medium">{project.name}</h3>
                      {project.href && <span className="text-accent">↗</span>}
                    </div>
                    <p className="text-sm text-muted">{project.detail}</p>
                  </>
                );

                return project.href ? (
                  <a
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-4 border border-rule hover:border-accent transition-colors fade-up${delay(i)}`}
                  >
                    {body}
                  </a>
                ) : (
                  <div
                    key={project.name}
                    className={`p-4 border border-rule fade-up${delay(i)}`}
                  >
                    {body}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="py-16 border-t border-rule">
            <h2 className="text-xs text-muted uppercase tracking-wider mb-8 fade-up">
              03 — Recognition
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm fade-up">
              {recognition.map((item) => (
                <div key={item.label}>
                  <span className={item.primary ? "text-accent" : "text-muted"}>
                    {item.primary ? "●" : "○"}
                  </span>{" "}
                  {item.label}
                </div>
              ))}
            </div>
          </section>

          <footer className="py-12 border-t border-rule text-sm">
            <div className="flex justify-between items-center gap-4">
              <div>
                <p className="text-muted">{footer.lineOne}</p>
                <p className="text-muted">{footer.lineTwo}</p>
              </div>
              <div className="flex gap-4">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors"
                >
                  gh
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors"
                >
                  li
                </a>
                <a href={mailto} className="text-accent">
                  email
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
