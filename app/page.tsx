import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main id="home" className="flex flex-col items-center justify-between">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
        {/* အခြား Sections များကို အောက်တွင် ဆက်လက်ထည့်သွင်းသွားမည် */}
      </main>
      <Footer />
    </>
  );
}
