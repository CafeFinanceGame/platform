import { create } from "zustand";

import { ListedItem } from "@/types";

interface MarketplaceStore {
  listedItems: Record<number, ListedItem>;
  setListedItem: (id: number, listedItem: ListedItem) => void;
}

export const useMarketplaceStore = create<MarketplaceStore>((set) => ({
  listedItems: {},
  setListedItem: (id, listedItem) =>
    set((state) => ({
      listedItems: { ...state.listedItems, [id]: listedItem },
    })),
}));
