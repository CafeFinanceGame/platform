import { PageContainer } from "@/components/layout/container";
import { Manufactory } from "./_components/Manufactory";

export default function CompanyPage() {
    return (
        <PageContainer>
            <header className="flex flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-semibold">Manufactory</h1>
                <p className="text-base text-default-500">Manufacture or mint the product nft</p>
            </header>
            <Manufactory />
        </PageContainer>
    );
}