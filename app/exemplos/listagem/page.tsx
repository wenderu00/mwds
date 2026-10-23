import type { Metadata } from "next";
import { container, SiteHeader } from "../../_docs/site-header";
import { ProjectsView } from "./projects-view";

export const metadata: Metadata = { title: "Listagem de projetos · @mw/ui" };

export default function ListingExample() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />
      <main id="conteudo" className={`${container} py-12`}>
        <ProjectsView />
      </main>
    </div>
  );
}
