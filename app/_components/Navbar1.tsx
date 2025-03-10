"use client";

import { useCAFToken } from "@/hooks/useTokenomics";
import { Button } from "@heroui/button";
import { Image, Skeleton, User } from "@heroui/react";
import { useAppKit } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import numeral from "numeral";
import { PiLightningFill } from "react-icons/pi";
import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export const Navbar1: React.FC<Props> = () => {
    const { open } = useAppKit();
    const { address } = useAccount();
    const { balanceOf } = useCAFToken();
    const { getCompanyItem } = useCAFItemsManagerActions();

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

    const { data: company, isSuccess: isCompanySuccess, isError: isCompanyError, isLoading: isCompanyLoading } = useQuery({
        queryKey: ['company', address],
        queryFn: async () => {
            if (address) {
                const company = await getCompanyItem(1);

                return company;
            }
        },
        enabled: !!address
    })

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
                <Button
                    as={"li"}
                    variant="light"
                    className="text-foreground-900"
                    endContent={<PiLightningFill size={24} />}
                    isLoading={isCompanyLoading}
                >
                    {isCompanySuccess ? company?.energy : '0'}
                </Button>
            </ul>
        )
    }



    if (isCompanyError || isError) return null;

    return (
        <>
            {isCompanyLoading ?
                <></>
                :
                <User
                    name="Company"
                    description={<Resources />}
                />}
        </>
    );
};