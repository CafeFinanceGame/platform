"use client";

import { useEffect, useState } from "react";
import { useGameClock } from "@/app/_hooks/useGameClock";
import { CountdownClock } from "@/app/(game)/_components/CountdownClock";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export const MarketplacePanel: React.FC<Props> = () => {
    const { lastProduceTime, setLastProduceTime } = useGameClock();
    const NEXT_PRODUCE_PERIOD = 6 * 60 * 60 * 1000;
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        const updateCountdown = () => {
            // mock lastProduceTime 2 hours ago
            const _lastProduceTime = Date.now() - 2 * 60 * 60 * 1000;
            const now = Date.now();
            const elapsedTime = now - _lastProduceTime;
            const newRemainingTime = Math.max((NEXT_PRODUCE_PERIOD - elapsedTime) / 1000, 0);
            setRemainingTime(newRemainingTime);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex flex-row items-center justify-end">
            <CountdownClock
                label="Next auto produce"
                time={remainingTime}
            />
        </div>
    );
};