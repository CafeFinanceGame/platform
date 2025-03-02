import "./page.css";
import { PageContainer } from "@/components/layout/container";
import { HeroSection } from "./_components/HeroSection";
import { CoverBackground } from "./_components/CoverBackground";

export default function HomePage() {
    return (
        <PageContainer>
            <CoverBackground />
            <HeroSection />
        </PageContainer>
    );
}