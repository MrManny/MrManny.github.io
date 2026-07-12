import AmbientPointer from '@/components/AmbientPointer';
import AnimatedBackground from '@/components/AnimatedBackground';
import Footer from '@/components/Footer';
import Gear from '@/components/Gear';
import Hero from '@/components/Hero';
import LineIsOpen from '@/components/LineIsOpen';
import OutsideTheRoadmap from '@/components/OutsideTheRoadmap';
import SelectedSystems from '@/components/SelectedSystems';
import TopNavigation from '@/components/TopNavigation';
import WhatIShare from '@/components/WhatIShare';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <AmbientPointer />
      <Gear />
      <TopNavigation />

      <main>
        <div className="shell">
          <Hero />
        </div>
        <SelectedSystems />
        <WhatIShare />
        <OutsideTheRoadmap />
        <LineIsOpen />
      </main>

      <Footer />
    </>
  );
}
