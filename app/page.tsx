import AnimatedBackground from '@/components/AnimatedBackground';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <div className="screen">
        <main>
          <Hero />
        </main>
        <Footer />
      </div>
    </>
  );
}
