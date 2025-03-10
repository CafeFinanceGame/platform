"use client";

import { Image } from "@heroui/react"
import { useCompanyStore } from "../../_hooks/useCompanyStore"
import { CompanyType } from "@/types"
import { CiCoffeeBean } from "react-icons/ci";
import { PiWashingMachine } from "react-icons/pi";
import { GiSugarCane } from "react-icons/gi";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";
interface Props extends React.HTMLAttributes<HTMLFormElement> {
}
export const CompanyProfile: React.FC<Props> = (props) => {
    const { address } = useAccount();
    const { getCompanyItem, getNextItemId } = useCAFItemsManagerActions();
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

    const { data: companyId } = useQuery({
        queryKey: ['companyId', address],
        queryFn: async () => {
            if (!address) return null;
            // const id = await getByOwner(address);
            const id = 2;

            setCompany({ ...company, id });

            return 2;
        },
        enabled: !!address
    })

    const { data: companyData } = useQuery({
        queryKey: ['company', companyId],
        queryFn: async () => {
            if (!companyId) return null;
            const test = await getNextItemId()

            console.log('test', test);
        },
        enabled: !!companyId
    })

    // React.useEffect(() => {
    //     if (companyData) {
    //         setCompany({
    //             id: company.id,
    //             energy: companyData.energy,
    //             owner: companyData.owner,
    //             role: companyData.role
    //         });
    //     }
    // }, [companyData])

    const RoleField = ({ role }: { role: CompanyType }) => {
        if (role === CompanyType.NONE) return null;

        return (
            <div className="flex flex-row gap-2 items-center">
                {metadata[role].icon}
                <p className="capitalize text-xs text-default-500">{metadata[role].label}</p>
            </div>
        )
    }

    if (company.role === CompanyType.NONE) return null;

    return (
        <div className="flex flex-row items-center justify-between rounded-3xl border-2 border-default-200 p-4 text-foreground">
            <div className="flex flex-col gap-2">
                <Image src={company.avatar || metadata[company.role].avatar_alt} alt="Company Avatar" className="w-32 aspect-square rounded-3xl" />
                <h1 className="text-2xl font-semibold">{company.name || 'Company Name'}</h1>
                <RoleField role={company.role} />
            </div>
        </div>
    )
}