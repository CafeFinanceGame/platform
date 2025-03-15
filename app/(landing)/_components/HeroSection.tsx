"use client";

import { Link } from "@heroui/link";
import { Chip } from "@heroui/react";
import { Image } from "@heroui/image";
import { LuSwords } from "react-icons/lu";
import { TbCards } from "react-icons/tb";
import { PiNetworkBold } from "react-icons/pi";
import { LuGamepad2 } from "react-icons/lu";

import { GetStartedDialog } from "@/app/(game)/_components/GetStartedDialog";
import constants from "@/utils/constants";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const HeroSection: React.FC<Props> = () => {
  const HeroCard1 = () => {
    return (
      <div className="flex flex-col bg-white/15 rounded-3xl backdrop-blur-3xl w-fit max-w-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-white p-4">BUSINESS TO EARN</h2>
        <div className="flex flex-row gap-4 p-4 w-full">
          <Image
            alt="Business to earn"
            className="w-32 aspect-square"
            src="/assets/hero-card-1.png"
          />
          <p className="w-full break-words">
            Build your coffee empire, trade resources, and earn{" "}
            <b>CAF Tokens</b> through strategic business growth
          </p>
        </div>
        <div className="flex gap-4 justify-center items-center p-4 w-full bg-[#DEF821]">
          <p className="text-[#A3B32B] font-semibold">
            New game model -{" "}
            <span className="font-semibold">Business to earn</span>
          </p>
        </div>
      </div>
    );
  };

  const HeroCard2 = () => {
    return (
      <div className="flex flex-col bg-white/15 rounded-3xl backdrop-blur-3xl w-fit max-w-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-white p-4">
          Dynamic Player-Driven Economy{" "}
        </h2>
        <div className="flex flex-row gap-4 p-4 w-full">
          <Image
            alt="Business to earn"
            className="w-32 aspect-square"
            src="/assets/hero-card-2.png"
          />
          <p className="w-full break-words">
            A dynamic, player-driven economy where items decay, prices shift,
            events shape markets, and energy fuels strategic gameplay{" "}
          </p>
        </div>
        <div className="flex gap-4 justify-center items-center p-4 w-full bg-[#21F8F8]">
          <p className="text-[#27B6B6] font-semibold">
            Hyper-realistic economy
          </p>
        </div>
      </div>
    );
  };

  const Tags = () => {
    const tags = [
      {
        icon: <LuGamepad2 size={20} />,
        label: "GameFi",
      },
      {
        icon: <TbCards size={20} />,
        label: "NFT - ERC1155",
      },
      {
        icon: <LuSwords size={20} />,
        label: "PvP",
      },
      {
        icon: <PiNetworkBold size={20} />,
        label: "Decentralized",
      },
    ];

    return (
      <div className="flex flex-row gap-4">
        {tags.map((tag) => (
          <Chip
            key={tag.label}
            className="text-default-500"
            startContent={tag.icon}
            variant="light"
          >
            {tag.label}
          </Chip>
        ))}
      </div>
    );
  };

  return (
    <section
      className="relative w-full h-full flex flex-row justify-center items-start pt-16"
      id="hero"
    >
      <div className="flex flex-col justify-center gap-4 flex-1 text-default">
        <Chip className="mb-4" color="primary" radius="full" variant="bordered">
          CORE CHAIN
        </Chip>
        <h1 id="hero-title">CaFi Game</h1>
        <p className="text-4xl font-bold text-foreground-500">
          Social PvP <span className="text-primary">Game</span>
        </p>
        <p className="w-full max-w-screen-sm font-medium break-words">
          CoFi Game is a cafe business simulation game where players will play
          one of the types of companies in the cafe ecosystem and interact with
          other players to build a competitive market.
        </p>
        <Tags />
        <div className="flex flex-row gap-4 items-center w-fit">
          <GetStartedDialog />
          <Link showAnchorIcon color="foreground" href={constants.platform.DOCS} className="cursor-pointer" target="_blank">
            Learn More
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <HeroCard1 />
        <HeroCard2 />
      </div>
    </section>
  );
};
