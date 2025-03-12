"use client";

import { useParams } from "next/navigation";
import { Image, Skeleton } from "@heroui/react";

import { useProductStore } from "../../../_hooks/useProductStore";

import constants from "@/utils/constants";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const ImageArea: React.FC<Props> = () => {
  const params = useParams();
  const { id } = params;

  const { products } = useProductStore();
  const product = products[Number(id)];

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      {product ? (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/25 blur-3xl w-64 aspect-square rounded-full" />
          {
            <Image
              alt={constants.images[product.productType].label}
              className="w-64 aspect-square"
              src={constants.images[product.productType].image}
            />
          }
        </>
      ) : (
        <Skeleton className="w-64 aspect-square rounded-3xl" />
      )}
    </div>
  );
};
