import { PageContainer } from "@/components/layout/container";
import { CompanyProfile } from "./_components/CompanyProfile";
import { Products } from "./_components/Products";
import { CompanyControllTabs } from "./_components/CompanyControllTabs";

export default function CompanyPage() {
    return (
        <PageContainer>
            <div className="flex flex-col gap-6 w-full">
                <CompanyProfile />
                <CompanyControllTabs />
            </div>
        </PageContainer>
    );
}