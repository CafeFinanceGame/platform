import { CompanyProfile } from "./_components/CompanyProfile";
import { CompanyControllTabs } from "./_components/CompanyControllTabs";

import { PageContainer } from "@/components/layout/container";

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
