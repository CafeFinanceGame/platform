"use client";

import { useCAFToken } from "@/hooks/useTokenomics";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Image, User } from "@heroui/react";
import { useAppKit } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { FaStore } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { useAccount } from "wagmi";
interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Navbar1: React.FC<Props> = () => {
    const { open } = useAppKit();
    const { address } = useAccount();
    const { balanceOf } = useCAFToken();

    const { data: balance } = useQuery({
        queryKey: ['balance', address],
        queryFn: async () => {
            if(address) {
                return await balanceOf();
            }
        },
        enabled: !!address
    })
    const navs = [
        {
            icon: <FaStore />,
            href: '/store'
        },
        {
            icon: <IoNotifications />,
            href: '/notifications'
        }
    ];

    const Resources = () => {
        return (
            <ul>
                <Button
                    as={"li"}
                    variant="light"
                    radius="full"
                    startContent={<Image src="/assets/cafi-token.png" alt="CaFi Token" />}
                >   

                </Button>
            </ul>
        )
    }

    return (
        <nav className="w-fit rounded-full p-2 text-default-900 bg-foreground-100">
            <ul className="flex gap-4">
                {navs.map((nav, index) => (
                    <Button
                        key={index}
                        as={Link}
                        variant="light"
                        radius="full"
                        isIconOnly
                    >
                        {nav.icon}
                    </Button>
                ))}
                {
                    address && (
                        <User
                            avatarProps={{
                                alt: 'User Avatar',
                                radius: 'full'
                            }}
                            name={address.slice(0, 3) + '...' + address.slice(-3)}
                            className="cursor-pointer"
                            onClick={() => open()}
                        />
                    )
                }
            </ul>
        </nav>
    );
};