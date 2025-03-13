"use client";

import { addToast } from "@heroui/react";
import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import numeral from "numeral";
import React from "react";
import { FaBasketShopping } from "react-icons/fa6";
import { IoRemoveOutline } from "react-icons/io5";
import { useAccount } from "wagmi";

import constants from "@/utils/constants";
import { ListedItem, ProductItem } from "@/types";
import { useCAFToken } from "@/hooks/useTokenomics";
import { useCAFMarketplace } from "@/hooks/useCAFMarketplace";
import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";
import { CAFButton } from "@/components/ui/button";
import { ProductItemCard } from "@/app/(game)/_components/items";
import { useGlobalState } from "@/app/_hooks/useGlobalState";

type Item = { product: ProductItem; listedItem: ListedItem };

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const ListedItems: React.FC<Props> = () => {
  const { searchKeyword } = useGlobalState();

  const queryClient = useQueryClient();

  const { getAllListedItemIds, getListedItem, buy, unlist } =
    useCAFMarketplace();
  const { getProductItem, hasProductItem } = useCAFItemsManagerActions();
  const { approve } = useCAFToken();
  const account = useAccount();
  const limit = 8;
  const pageParam = 1;

  const {
    data: listedItemIds,
    isError,
    isLoading: isLoadingIds,
  } = useQuery({
    queryKey: ["marketplace", "getAllListedItemIds"],
    queryFn: async () => {
      const listedItemIds = await getAllListedItemIds();

      return listedItemIds;
    },
  });

  const {
    mutate: buyItem,
    isPending: isBuying,
    isSuccess: isBuySuccess,
    isError: isBuyError,
  } = useMutation({
    mutationKey: ["marketplace", "buy"],
    mutationFn: async ({ id, price }: { id: number; price: number }) => {
      await approve(constants.contracts.CAF_MARKETPLACE_ADDRESS, price);
      await buy(id);
    },
    onSuccess: () => {
      addToast({
        color: "success",
        title: "Success",
        description: "Item has been bought",
      });
    },
    onError: (error) => {
      addToast({
        color: "danger",
        title: "Error",
        description: error.message,
      });
    },
  });

  const { data: listedItems,
    isLoading: isLoadingItems,
    isFetchingNextPage: isFetchingItems,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["marketplace", "getAllListedItems"],
    queryFn: async ({ pageParam = 1 }): Promise<Item[]> => {
      if (!listedItemIds) return [];

      const startIdx = (pageParam - 1) * limit;
      const endIdx = startIdx + limit;
      const pageItems = listedItemIds.slice(startIdx, endIdx);

      const allItems = await Promise.all(
        pageItems.map(async (id: number) => {
          const listedItem = await getListedItem(id);
          const product = await getProductItem(listedItem.id);
          return { product, listedItem };
        })
      );

      return allItems;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length === limit ? nextPage : undefined;
    },
    enabled: !!listedItemIds,
  });

  const ListedItem = ({
    product,
    listedItem,
    isSkeleton = false,
  }: {
    product: ProductItem;
    listedItem: ListedItem;
    isSkeleton?: boolean;
  }) => {
    const {
      mutate: unlistItem,
      isPending: isUnlisting,
      isSuccess: isUnlistSuccess,
      isError: isUnlistError,
    } = useMutation({
      mutationKey: ["marketplace", "unlist", listedItem.id],
      mutationFn: async (id: number) => {
        await unlist(id);
      },
      onSuccess: () => {
        addToast({
          title: "Success",
          description: "Item has been unlisted",
          color: "success",
        });

        queryClient.invalidateQueries({
          queryKey: ["marketplace", "getAllListedItems"],
        });
      },
      onError: (error) => {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      },
    });

    const isOwner = listedItem.owner === account.address;

    return (
      <ProductItemCard
        isSkeleton={isSkeleton}
        customTools={(product) => (
          <div className="w-full flex items-center justify-between space-x-2">
            <p className="text-sm text-default-500">#{listedItem.id}</p>
            <p className="text-sm text-foreground font-medium">
              {numeral(listedItem.price).format("0,0.00")} CAF
            </p>

            {isOwner ? (
              <CAFButton
                isDisabled={isUnlisting}
                isLoading={isUnlisting}
                size="sm"
                startContent={<IoRemoveOutline />}
                variant="flat"
                onClick={() => unlistItem(listedItem.id)}
              >
                Unlist
              </CAFButton>
            ) : (
              <CAFButton
                isDisabled={isBuying}
                isLoading={isBuying}
                size="sm"
                startContent={<FaBasketShopping />}
                onClick={() =>
                  buyItem({ id: listedItem.id, price: listedItem.price })
                }
              >
                Buy
              </CAFButton>
            )}
          </div>
        )}
        product={product}
      />
    );
  };

  React.useEffect(() => {
    console.log("listedItems", listedItems);
  }, [listedItems]);

  if (isLoadingIds || isLoadingItems) return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, idx) => (
          <ProductItemCard key={idx} isSkeleton product={{} as any} />
        ))}
      </div>
    </div>
  )
  if (isError) return null;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {listedItems?.pages.flat()
          .filter(({ product, listedItem }) => {
            const matchesType = !searchKeyword || constants.images[product.productType].label.toLowerCase().includes(searchKeyword.toLowerCase());
            const matchesPrice = !searchKeyword || numeral(listedItem.price).format("0,0.00").includes(searchKeyword);
            const matchesId = !searchKeyword || listedItem.id.toString().includes(searchKeyword);

            return matchesType || matchesPrice || matchesId;
          })
          .map(({ product, listedItem }) => (
            <ListedItem
              key={nanoid()}
              listedItem={listedItem}
              product={product}
            />
          ))}
      </div>

      <div className="flex justify-center">
        {hasNextPage && (
          <CAFButton
            variant="bordered"
            isLoading={isFetchingItems}
            isDisabled={isFetchingItems}
            onClick={() => fetchNextPage()}
            className="w-fit"
          >
            Load More
          </CAFButton>
        )}
      </div>
    </div>
  );
};
