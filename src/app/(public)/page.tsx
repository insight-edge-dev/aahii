import HeroSlider from "@/components/home/HeroSlider";
import CoreResearch from "@/components/home/CoreResearch";
import IITStats from "@/components/home/IITStats";
import IITHeroGallery from "@/components/home/IITHeroGallery";
import LabResearchSection from "@/components/home/LabResearchSection";
import TimelineBento from "@/components/home/TimelineBento";
import ProposedPrograms from "@/components/home/ProposedPrograms";
import Niramaya from "@/components/home/niramaya";
import SyncedImageContent from "@/components/home/SyncedImageContent";
import PressAndMedia from "@/components/home/PressAndMedia";
import GovMarquee from "@/components/GovMarquee";
import LatestNewsTicker from "@/components/latest-news-ticker";

export default function Home() {
  return (
     <>
      <HeroSlider />
      <LatestNewsTicker />
      <CoreResearch />
      <IITStats />
      <IITHeroGallery />
      <GovMarquee />
      <LabResearchSection />
      <TimelineBento />
      <GovMarquee />
      <ProposedPrograms />
      <GovMarquee />
      <Niramaya />
      <SyncedImageContent />
      <GovMarquee />
      <PressAndMedia />
     </>
  );
}
