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
import numeral from "numeral";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Navbar1: React.FC<Props> = () => {
    const { open } = useAppKit();
    const { address } = useAccount();
    const { balanceOf } = useCAFToken();

    const { data: balance, isSuccess, isError, isLoading: isBalanceLoading } = useQuery({
        queryKey: ['balance', address],
        queryFn: async () => {
            if (address) {
                const balance = await balanceOf(address);

                return balance / 1e18;
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
        if (!address) return null;

        return (
            <ul>
                <Button
                    as={"li"}
                    variant="light"
                    className="text-foreground-900"
                    endContent={<Image src="/assets/cafi-token.png" alt="CaFi Token" className="w-5 aspect-square" />}
                    isLoading={isBalanceLoading}
                >
                    {isSuccess ? numeral(balance).format('0.0a') : '0'}
                </Button>
            </ul>
        )
    }

    return (
        <nav className="w-fit h-fit p-1 rounded-full text-foreground-900 bg-foreground-100">
            <ul className="flex gap-1">
                {navs.map((nav, index) => (
                    <Button
                        key={index}
                        as={Link}
                        className="text-foreground-900"
                        variant="light"
                        radius="full"
                        isIconOnly
                    >
                        {nav.icon}
                    </Button>
                ))}
                <Resources />
                {
                    address && (
                        <User
                            avatarProps={{
                                size: 'sm',
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