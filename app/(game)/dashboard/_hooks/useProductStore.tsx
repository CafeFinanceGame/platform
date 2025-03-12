import { create } from "zustand";
import { ProductItem } from "@/types";

interface ProductStore {
    products: Record<number, ProductItem>;
    setProduct: (id: number, product: ProductItem) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: {},
    setProduct: (id, product) =>
        set((state) => ({ products: { ...state.products, [id]: product } })),
}));