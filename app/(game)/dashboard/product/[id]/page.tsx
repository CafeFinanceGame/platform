import { ImageArea } from "./_components/ImageArea";
import { MarketplaceArea } from "./_components/MarketplaceArea";
import Providers from "./providers";

import { PageContainer } from "@/components/layout/container";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Providers>
      <PageContainer>
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          <ImageArea />
          <MarketplaceArea />
        </div>
      </PageContainer>
    </Providers>
  );
}
