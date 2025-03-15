import { Chip } from "@heroui/react";
import React from "react";
import { FaRegClock } from "react-icons/fa6";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    label?: string;
    time?: number;
}

export const CountdownClock: React.FC<Props> = ({ icon, label, time = 0 }) => {
    const [remainingTime, setRemainingTime] = React.useState(time);
    const [isRunning, setIsRunning] = React.useState(false);

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    React.useEffect(() => {
        setRemainingTime(time);
        setIsRunning(time > 0);
    }, [time]);

    React.useEffect(() => {
        if (isRunning && remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prev) => Math.max(prev - 1, 0));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRunning, remainingTime]);

    return (
        <div className="flex flex-col gap-2">
            <Chip
                size="lg"
                variant="light"
                startContent={icon || <FaRegClock />}
                className="w-full text-foreground-500"
            >
                {label || "Countdown"}
            </Chip>
            <div className="flex items-start justify-center gap-2 text-2xl font-bold">
                <div className="flex flex-col items-center gap-1">
                    <p className="w-12 text-center text-foreground p-2 rounded">
                        {String(hours).padStart(2, "0")}
                    </p>
                    <p className="text-foreground-500 text-xs">
                        HOURS
                    </p>
                </div>
                <p className="text-foreground-500 p-2">:</p>
                <div className="flex flex-col items-center gap-1">
                    <p className="w-12 text-center text-foreground p-2 rounded">
                        {String(minutes).padStart(2, "0")}
                    </p>
                    <p className="text-foreground-500 text-xs">
                        MINUTES
                    </p>
                </div>
                <p className="text-foreground-500 p-2">:</p>
                <div className="flex flex-col items-center gap-1">
                    <p className="w-12 text-center text-foreground p-2 rounded">
                        {String(seconds).padStart(2, "0")}
                    </p>
                    <p className="text-foreground-500 text-xs">
                        SECONDS
                    </p>
                </div>
            </div>
        </div>
    );
};