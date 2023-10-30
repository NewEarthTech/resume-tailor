import { Features } from "@/components/content/features";
import { Hero } from "@/components/content/hero";
import { Testimonials } from "@/components/content/testimonials";
import { Footer } from "@/components/layout/footer";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
