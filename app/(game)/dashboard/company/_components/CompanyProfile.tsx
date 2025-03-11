"use client";

import { Image, Skeleton } from "@heroui/react"
import { useCompanyStore } from "../../_hooks/useCompanyStore"
import { CompanyType } from "@/types"
import { CiCoffeeBean } from "react-icons/ci";
import { PiWashingMachine } from "react-icons/pi";
import { GiSugarCane } from "react-icons/gi";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { nanoid } from 'nanoid'

import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
}
export const CompanyProfile: React.FC<Props> = (props) => {
    const { address } = useAccount();
    const { getCompanyItem, getCompanyItemIdByOwner } = useCAFItemsManagerActions();
    const { company, setCompany } = useCompanyStore();

    const metadata = {
        [CompanyType.COFFEE_COMPANY]: {
            icon: <CiCoffeeBean />,
            label: 'Coffee Company',
            avatar_alt: 'https://i.pinimg.com/736x/53/2f/0c/532f0c643d553e0449275c0b80d481aa.jpg'
        },
        [CompanyType.MACHINE_COMPANY]: {
            icon: <PiWashingMachine />,
            label: 'Machine Company',
            avatar_alt: 'https://i.pinimg.com/736x/26/30/8e/26308ef78d21841abdb37b7bf55feead.jpg'
        },
        [CompanyType.MATERIAL_COMPANY]: {
            icon: <GiSugarCane />,
            label: 'Material Company',
            avatar_alt: 'https://i.pinimg.com/736x/b4/7d/1f/b47d1f6ade41dc7d2ab0aad77afd2105.jpg'
        }
    } as any;

    const { isLoading } = useQuery({
        queryKey: ['company-profile', 'company', address],
        queryFn: async () => {
            if (address) {

                const id = await getCompanyItemIdByOwner(address);
                const companyData = await getCompanyItem(id);

                setCompany({ ...company, ...companyData });
                return id;
            }
        },
        enabled: !!address
    })

    const RoleField = ({ role }: { role: CompanyType }) => {
        if (role === CompanyType.UNKNOWN) return null;

        return (
            <div className="flex flex-row gap-2 items-center">
                {metadata[role].icon}
                <p className="capitalize text-xs text-default-500">{metadata[role].label}</p>
            </div>
        )
    }

    if (isLoading) return (
        <Skeleton className="w-full rounded-3xl h-64" />
    )

    const CompanyInfoArea = () => {
        return (
            <div className="flex flex-[1] flex-col gap-2 rounded-3xl border-2 border-default-200 p-4">
                <Image src={company.avatar || metadata[company.role].avatar_alt} alt="Company Avatar" className="w-32 aspect-square rounded-3xl" />
                <h1 className="text-2xl font-semibold">{company.name || 'Company Name'}</h1>
                <RoleField role={company.role} />
            </div>
        )
    }

    const MarketArea = () => {
        const fields = [
            { label: 'Revenue', value: 723 },
            { label: 'Ranking', value: 2 },
            { label: 'Market Cap', value: 1000000 }
        ]
        return (
            <div className="flex flex-[2] flex-col gap-2 items-end justify-center">
                {fields.map(({ label, value }) => (
                    <div key={nanoid()} className="w-full max-w-screen-sm flex flex-row justify-between items-center">
                        <p className="text-base text-default-500">{label}</p>
                        <p className="text-base font-medium">{value}</p>
                    </div>
                ))}
            </div>
        )
    }

    if (company.role === CompanyType.UNKNOWN) return null;

    return (
        <div className="flex flex-row items-center justify-between p-4 text-foreground">
            <CompanyInfoArea />
            <MarketArea />
        </div>
    )
}