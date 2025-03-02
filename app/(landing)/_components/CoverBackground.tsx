"use client";

import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const CoverBackground: React.FC<Props> = () => {
    return (
        <div className="fixed top-0 left-0 w-screen z-0 pointer-events-none">
            <div className="relative w-full h-[700px] overflow-hidden">
                <img
                    src="/assets/shadow-cover.png"
                    alt="Shadow Cover Background"
                    className="absolute -bottom-32 left-0 w-full z-[1]"
                />
                <img
                    id="cover-background"
                    src="/assets/landing-cover.png"
                    alt="Landing Cover Background"
                    className="absolute bottom-0 w-[120%] left-1/2 transform -translate-x-1/2 z-0"
                />
            </div>
        </div>
    )
}