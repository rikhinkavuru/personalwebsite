import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/ProfileHeader";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <main className="mx-auto w-full max-w-[660px] flex-1 px-4 pt-16 sm:px-6 sm:pt-24">
        <ProfileHeader crumbs={[{ label: "404" }]} />

        <section className="pt-20">
          <p className="text-sm font-medium text-muted">404</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-primary">
            Nothing here
          </h2>
          <p className="mt-2 text-base text-muted">That page does not exist.</p>

          <Link
            href="/"
            className="mt-6 inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-base font-medium text-bg transition-opacity hover:opacity-80"
          >
            Back home
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
