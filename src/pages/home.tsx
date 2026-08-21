import { Hero } from "../components/hero";
import { Services } from "../components/services";
import { TechStack } from "../components/tech-stack";
import { ContactUS } from "../components/ContactUS";
import { Footer } from "../components/footer";
import { Testimonials } from "../components/testimonials";
import { useEffect } from "react";
import { FAQ } from "../components/f&q";

export default function Home() {
  useEffect(() => {
    document.title = "StackGSB Studio | Web Development & Digital Solutions";
  }, []);
  return (
    <>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
        <main>
          <Hero />
          <TechStack />
          <Services />
          <Testimonials />
          <FAQ />
          <ContactUS />
        </main>
        <Footer />
      </div>
    </>
  );
}
