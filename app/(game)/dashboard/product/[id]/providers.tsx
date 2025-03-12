"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useProductStore } from "../../_hooks/useProductStore";

import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";

export default function Providers({ children }: React.PropsWithChildren<{}>) {
  const params = useParams();
  const { id } = params;
  const { getProductItem } = useCAFItemsManagerActions();

  const { products, setProduct } = useProductStore();

  const {} = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const product = await getProductItem(Number(id));

      setProduct(Number(id), product);

      return product;
    },
    enabled: !products[Number(id)],
  });

  return <>{children}</>;
}
