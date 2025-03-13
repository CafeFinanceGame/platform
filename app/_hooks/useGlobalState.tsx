import { create } from "zustand";

type GlobalState = {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
    searchKeyword: "",
    setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
}));