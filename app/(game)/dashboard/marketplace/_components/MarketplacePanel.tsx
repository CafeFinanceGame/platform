"use client";

import { useEffect, useState } from "react";
import { useGameClock } from "@/app/_hooks/useGameClock";
import { CountdownClock } from "@/app/(game)/_components/CountdownClock";
import { useQuery } from "@tanstack/react-query";
import { useCAFMarketplace } from "@/hooks/useCAFMarketplace";
import { useCAFGameEconomy } from "@/hooks/useCAFDependency";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export const MarketplacePanel: React.FC<Props> = () => {
    const { getLastAutoListTime } = useCAFMarketplace();
    const { AUTO_PERIOD_TIME } = useCAFGameEconomy();
    const [remainingTime, setRemainingTime] = useState(0);
    const { data: lastProduceTime } = useQuery({
        queryKey: ["marketplace", "panel"],
        queryFn: async (): Promise<number> => {
            const lastAutoListTime = await getLastAutoListTime();

            return lastAutoListTime;
        },
        refetchInterval: 1000,
    })
    useEffect(() => {
        const updateCountdown = () => {
            if (!lastProduceTime) return;

            const now = Date.now();
            const elapsedTime = now - lastProduceTime;
            const newRemainingTime = Math.max((AUTO_PERIOD_TIME - elapsedTime) / 1000, 0);
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