"use client";

import { ProductItem } from "@/app/(game)/_components/items";
import { CAFButton } from "@/components/ui/button";
import { productItems } from "@/mocks";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Manufactory: React.FC<Props> = () => {
    return (
        <form>
            <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                <div className="flex-1 h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {productItems.map((productItem, index) => (
                        <ProductItem
                            key={index}
                            product={productItem}
                        />
                    ))}
                </div>
                <CAFButton
                    type="submit"
                    size="md"
                >
                    Manufacture now
                </CAFButton>
            </div>
        </form>
    );
};
