import { Features } from "@/components/content/features";
import { Hero } from "@/components/content/hero";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/testimonials";

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
