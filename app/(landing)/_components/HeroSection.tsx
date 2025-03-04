"use client";

import { Link } from "@heroui/link";
import { GetStartedDialog } from "@/app/(game)/_components/GetStartedDialog";
import { CreateCompanyForm } from "@/app/(game)/_components/CreateCompanyForm";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const HeroSection: React.FC<Props> = () => {
    return (
        <section id="hero" className="relative w-full h-full flex flex-row justify-center items-start pt-32">
            <div className="flex flex-col gap-4 flex-1 text-default">
                <h1 className="text-9xl font-bold">
                    <span className="text-primary">Ca</span>
                    <span>Fi</span>
                </h1>
                <p className="text-secondary text-4xl font-bold">Social PvP Game</p>
                <p className="w-full max-w-screen-sm font-medium break-words">CoFi Game is a cafe business simulation game where players will play one of the types of companies in the cafe ecosystem and interact with other players to build a competitive market.</p>
                <div className="flex flex-row gap-4 items-center w-fit">
                    <CreateCompanyForm />
                    <GetStartedDialog />
                    <Link href="/about" showAnchorIcon color="foreground">Learn More</Link>
                </div>
            </div>
            <div className="flex flex-col gap-4">
            </div>
        </section>
    )
}