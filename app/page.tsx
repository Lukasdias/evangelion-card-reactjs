import { Suspense } from "react";
import type { Metadata } from "next";
import EpisodeCardGenerator from "@/components/EpisodeCardGenerator";
import { StructuredData } from "@/components/StructuredData";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const metadata: Metadata = {
  title: "Evangelion Title Card Generator | MAGI System",
  description:
    "Create authentic Neon Genesis Evangelion episode title cards with customizable text, fonts, and effects. Free online tool with MAGI System terminal interface.",
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <EpisodeCardGenerator />
        </Suspense>
      </main>
    </>
  );
}
