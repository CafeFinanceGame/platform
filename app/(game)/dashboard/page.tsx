import { PageContainer } from "@/components/layout/container";
import { HeroSection } from "./_components/HeroSection";
import { ProductItemCard } from "../_components/items";

export default function HomePage() {
    return (
        <PageContainer>
            <p>
                <HeroSection />
            </p>
        </PageContainer>
    );
}