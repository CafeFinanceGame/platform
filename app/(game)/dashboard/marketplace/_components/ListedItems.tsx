"use client";

import { ProductItem } from "@/app/(game)/_components/items"
import { useCAFMarketplace } from "@/hooks/useCAFMarketplace";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const ListedItems: React.FC<Props> = () => {
    const { getAllListedItems } = useCAFMarketplace();
    const { data: listedItems, isError, isLoading } = useQuery({
        queryKey: ['listedItems'],
        queryFn: async () => {
            const listedItems = await getAllListedItems();
            console.log(listedItems)
            return listedItems;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return null;
    if (!listedItems) return <div className="text-default-500 w-full flex items-center">No listed items</div>;


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {listedItems && listedItems.map((item, index) => (
                <ProductItem
                    key={index}
                    product={item.product}
                    listedItem={item.listedItem}
                />
            ))}
        </div>
    )
}