import type { Metadata } from "next";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <div className="fixed left-[calc(50%-400px)] top-0 bottom-0 w-px bg-rule hidden lg:block" />
      <div className="fixed right-[calc(50%-400px)] top-0 bottom-0 w-px bg-rule hidden lg:block" />

      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <header className="py-6 border-b border-rule flex items-center justify-between text-xs">
            <span className="text-muted">
              {profile.handle}
              <span className="blink text-accent">_</span>
            </span>
            <a href="/" className="text-accent">
              home
            </a>
          </header>

          <section className="py-24">
            <p className="text-xs text-muted mb-4">404</p>
            <h1 className="text-4xl md:text-5xl font-light mb-6">
              <span className="font-serif italic">Nothing</span>{" "}
              <span className="text-muted">here</span>
            </h1>
            <p className="text-muted mb-8 leading-relaxed">
              That page does not exist.
            </p>
            <a
              href="/"
              className="inline-block px-4 py-2 bg-ink text-bg text-sm hover:bg-accent transition-colors"
            >
              Back home →
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
