import { create } from "zustand";

enum GameClockStateType {
    LAST_PRODUCE_TIME = "lastProduceTime",
    LAST_DECAY_TIME = "lastDecayTime",
}

type GameClockState = {
    lastProduceTime: number;
    lastDecayTime: number;
    setLastProduceTime: (time: number) => void;
    setLastDecayTime: (time: number) => void;
    start: (type: GameClockStateType) => void;
    stop: (type: GameClockStateType) => void;
    reset: (type: GameClockStateType) => void;
};

export const useGameClock = create<GameClockState>((set) => ({
    lastProduceTime: 0,
    lastDecayTime: 0,
    setLastProduceTime: (time) => set(() => ({ lastProduceTime: time })),
    setLastDecayTime: (time) => set(() => ({ lastDecayTime: time })),

    start: (type) => set((state) => ({ ...state, [type]: Date.now() })),

    stop: (type) => set((state) => ({ ...state, [type]: 0 })),

    reset: (type) => set((state) => ({ ...state, [type]: 0 })),
}));