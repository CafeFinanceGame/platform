import { ListedItems } from "./_components/ListedItems";

import { PageContainer } from "@/components/layout/container";
import { MarketplacePanel } from "./_components/MarketplacePanel";

export default function CompanyPage() {
  return (
    <PageContainer>
      <div className="w-full h-full flex flex-col gap-6">
        <MarketplacePanel />
        <ListedItems />
      </div>
    </PageContainer>
  );
}
