import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeatureCards } from '@/components/FeatureCards';
import { ChapterGrid } from '@/components/ChapterGrid';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeatureCards />
        <ChapterGrid />
      </main>
      <Footer />
    </div>
  );
}
