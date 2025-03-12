import "./page.css";
import { HeroSection } from "./_components/HeroSection";
import { CoverBackground } from "./_components/CoverBackground";

import { PageContainer } from "@/components/layout/container";

export default function HomePage() {
  return (
    <PageContainer>
      <CoverBackground />
      <HeroSection />
    </PageContainer>
  );
}
