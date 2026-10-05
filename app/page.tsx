import TabBar from "@/components/TabBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import ScrollFx from "@/components/ScrollFx";
import { projects } from "@/content/projects";
import { mock } from "@/lib/mock";

export default function Home() {
  // Resolve placeholder screenshots at build time so the client gets plain image URLs.
  const items = projects.map((p) => ({
    ...p,
    imgs: p.shots.map((s) => (typeof s === "string" ? s : mock(s[0], s[1]))),
  }));

  return (
    <>
      <TabBar />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Projects projects={items} />
        <Skills />
      </main>
      <Footer />
      <StatusBar />
      <ScrollFx />
    </>
  );
}
