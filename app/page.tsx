import TabBar from "@/components/TabBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Setup from "@/components/Setup";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import ScrollFx from "@/components/ScrollFx";
import { projects } from "@/content/projects";
import { resolveMedia } from "@/lib/media";

export default function Home() {
  // Resolve each gallery at build time (folder files, listed files or placeholders).
  const items = projects.map((p) => ({ ...p, ...resolveMedia(p) }));

  return (
    <>
      <TabBar />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects projects={items} />
        <Skills />
        <Setup />
      </main>
      <Footer />
      <StatusBar />
      <ScrollFx />
    </>
  );
}
