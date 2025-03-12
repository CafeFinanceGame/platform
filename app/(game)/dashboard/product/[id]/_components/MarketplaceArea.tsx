"use client";

import { useParams } from "next/navigation";
import { addToast, Chip, Progress, Skeleton } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import numeral from "numeral";
import { FaBasketShopping } from "react-icons/fa6";
import { IoRemoveOutline } from "react-icons/io5";
import React from "react";
import { useAccount } from "wagmi";

import { useMarketplaceStore } from "../../../_hooks/useMarketplaceStore";
import { useProductStore } from "../../../_hooks/useProductStore";

import { ListDialog } from "./ListDialog";

import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";
import { CAFButton } from "@/components/ui/button";
import { useCAFToken } from "@/hooks/useTokenomics";
import { useCAFMarketplace } from "@/hooks/useCAFMarketplace";
import { formatTime } from "@/lib";
import constants from "@/utils/constants";
import { ListedItem } from "@/types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const MarketplaceArea: React.FC<Props> = () => {
  const params = useParams();
  const id = Number(params.id);

  const queryClient = useQueryClient();
  const account = useAccount();
  const { listedItems, setListedItem } = useMarketplaceStore();
  const { products } = useProductStore();
  const { list, buy, unlist, getListedItem } = useCAFMarketplace();
  const { approve } = useCAFToken();
  const { balanceOf } = useCAFItemsManagerActions();

  const product = products[Number(id)];
  const listedItem = listedItems[Number(id)];

  const [isOwner, setIsOwner] = React.useState(false);
  const [isListed, setIsListed] = React.useState(listedItem ? true : false);

  const Field = ({
    label,
    value,
  }: {
    label: React.ReactNode;
    value: React.ReactNode;
  }) => {
    return (
      <div className="flex flex-row gap-1 justify-between items-center w-full text-foreground ">
        {label}
        {value}
      </div>
    );
  };

  const ProductHeader = () => {
    if (!product) return <Skeleton className="w-full h-10 rounded-3xl" />;

    return (
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-4xl font-semibold">
          {constants.images[product.productType].label}
        </h1>
        <span className="text-foreground-500">#{id}</span>
      </div>
    );
  };
  const OverviewInfoArea = () => {
    if (!product) return <Skeleton className="w-full h-20 rounded-3xl" />;

    return (
      <div className="flex flex-col gap-4 w-full">
        <Progress
          showValueLabel
          color="primary"
          label="Energy"
          radius="full"
          size="sm"
          value={product.energy}
        />
        <Progress
          showValueLabel
          color="primary"
          label="Durability"
          radius="full"
          size="sm"
          value={product.durability}
        />
        <Progress
          showValueLabel
          color="secondary"
          label="Freshness"
          radius="full"
          size="sm"
          value={
            new Date().getTime() > product.expTime
              ? 0
              : ((product.mfgTime - new Date().getTime()) * 100) /
                (product.expTime - product.mfgTime)
          }
        />
        <Field label="Decay rate per quarter day" value={<p>1</p>} />
      </div>
    );
  };

  const DecayInfoArea = () => {
    if (!product) return <Skeleton className="w-full h-4 rounded-3xl" />;

    return (
      <div className="flex flex-row justify-between w-full gap-2 text-foreground-500">
        <p>MFG, {formatTime(product.mfgTime * 1e3)}</p>
        <p>EXP, {formatTime(product.expTime * 1e3)}</p>
      </div>
    );
  };

  const MarketplaceTools = () => {
    const { isLoading: isLoadingListedItem } = useQuery({
      queryKey: ["marketplace", "items", id],
      queryFn: async () => {
        const listedItem = await getListedItem(id);
        const balance = await balanceOf(account.address!, id);

        if (listedItem.id !== 0) {
          setListedItem(id, listedItem);
        }
        setIsListed(listedItem.id !== 0);
        setIsOwner(balance > 0);

        return listedItem;
      },
      enabled: !!product || !!listedItems,
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
        queryClient.invalidateQueries({ queryKey: ["marketplace"] });
      },
      onError: (error) => {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      },
    });

    const { mutate: unlistItem, isPending: isUnlisting } = useMutation({
      mutationKey: ["marketplace", "unlist"],
      mutationFn: async (id: number) => {
        await unlist(id);
      },
      onSuccess: () => {
        addToast({
          title: "Success",
          description: "Item has been unlisted",
          color: "success",
        });
        setListedItem(id, {} as ListedItem);
      },
      onError: (error, _, context) => {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      },
    });

    if (isLoadingListedItem)
      return <Skeleton className="w-full h-10 rounded-3xl" />;

    if (!isListed && isOwner) {
      return (
        <div className="w-full flex items-center justify-end">
          <ListDialog />
        </div>
      );
    }

    if (!listedItem) return null;

    return (
      <div className="w-full flex items-center justify-between space-x-2">
        <p className="text-sm text-default-500">#{listedItem.id}</p>
        <p className="text-sm text-foreground font-medium">
          {numeral(listedItem.price).format("0,0.00")} CAF
        </p>

        {isOwner ? (
          <CAFButton
            isDisabled={isUnlisting}
            isLoading={isUnlisting}
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
            startContent={<FaBasketShopping />}
            onClick={() =>
              buyItem({ id: listedItem.id, price: listedItem.price })
            }
          >
            Buy
          </CAFButton>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 items-start justify-center md:px-8 lg:px-16">
      {!isListed && (
        <Chip color="default" radius="full">
          Not listed
        </Chip>
      )}
      <ProductHeader />
      <OverviewInfoArea />
      <DecayInfoArea />
      <MarketplaceTools />
    </div>
  );
};
