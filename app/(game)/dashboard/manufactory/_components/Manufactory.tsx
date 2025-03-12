"use client";

import { CAFButton } from "@/components/ui/button";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const Manufactory: React.FC<Props> = () => {
  return (
    <form>
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
        <div className="flex-1 h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* {productItems.map((productItem, index) => (
                        <ProductItemCard
                            key={index}
                            product={productItem}
                        />
                    ))} */}
        </div>
        <CAFButton size="md" type="submit">
          Manufacture now
        </CAFButton>
      </div>
    </form>
  );
};
