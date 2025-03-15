"use client";

import { Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";
import { ProductItemCard } from "@/app/(game)/_components/items";
import { Empty } from "@/components/Empty";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Products: React.FC<Props> = () => {
  const { getProductItemIdsByOwner, getProductItem } =
    useCAFItemsManagerActions();
  const { address } = useAccount();
  const { data: productIds, isLoading } = useQuery({
    queryKey: ["products", "company", address],
    queryFn: async () => {
      if (address) {
        const productIds = await getProductItemIdsByOwner(address);

        console.log(productIds);

        return productIds;
      }
    },
    enabled: !!address,
  });

  const {
    data: products,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["products", productIds],
    queryFn: async () => {
      if (productIds) {
        const _products = await Promise.all(
          productIds.map(async (productId: number) => {
            const product = await getProductItem(productId);

            return product;
          }),
        );

        return _products;
      }
    },
    enabled: !!productIds,
  });

  if (isLoading) return <Skeleton className="w-full h-full rounded-3xl" />;

  if (products?.length === 0) return <Empty emptyText="No products available" />
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products?.map((product, index) => (
        <ProductItemCard key={index} product={product} />
      ))}
    </div>
  );
};
