"use client";

import React from "react";
import { useCAFItemsManagerActions } from "@/hooks/useCAFItems";
import { CompanyType } from "@/types";
import { useAccount, useWatchContractEvent } from "wagmi";
import { Select, Selection, SelectItem } from "@heroui/react";
import { FaBuilding } from "react-icons/fa6";
import { CAFButton } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import CAFItemsManagerAbis from "@/abis/CAFItemsManager";
import { useCompanyStore } from "../dashboard/_hooks/useCompanyStore";
import { useRouter } from "next/navigation";

export const companies = [
    {
        key: CompanyType.COFFEE_COMPANY,
        label: 'Coffee Company'
    },
    {
        key: CompanyType.MACHINE_COMPANY,
        label: 'Machine Company'
    },
    {
        key: CompanyType.MATERIAL_COMPANY,
        label: 'Material Company'
    }
]
interface Props extends React.HTMLAttributes<HTMLFormElement> {
    hasCompany: boolean;
}
export const CreateCompanyForm: React.FC<Props> = (props) => {
    const { hasCompany } = props;
    const { createCompanyItem } = useCAFItemsManagerActions();
    const { isConnected, address } = useAccount();
    const { company, setCompany } = useCompanyStore();
    const [role, setRole] = React.useState<Selection>(new Set([]));
    const router = useRouter();

    useWatchContractEvent({
        abi: CAFItemsManagerAbis,
        eventName: 'CompanyItemCreated',
        onLogs: (logs) => {
            const parsedRole = Array.from(role as Set<CompanyType>);

            setCompany({
                ...company,
                id: Number(logs[0]?.args?.companyId),
                role: parsedRole[0]
            })
        }
    })

    const { mutate: createCompany, isPending: isCreating } = useMutation({
        mutationKey: ['createCompany', address],
        mutationFn: async () => {
            if (!role) {
                addToast({
                    color: "warning",
                    title: "Warning",
                    description: "Please select a company to create"
                })
                return;
            }
            if (!address) {
                addToast({
                    color: "warning",
                    title: "Warning",
                    description: "Please connect your wallet to create a company"
                })
                return;
            }

            const parsedRole = Array.from(role as Set<CompanyType>);
            await createCompanyItem(address, parsedRole[0]);
        },
        onError: (error) => {
            console.error('Error creating company', error);
            addToast({
                color: "danger",
                title: "Error",
                description: "Error creating company"
            })
        },
        onSuccess: () => {
            addToast({
                color: "success",
                title: "Success",
                description: "Company created successfully"
            })

            setTimeout(() => {
                router.push('/dashboard/company');
            }, 2000);
        }
    })

    if (!isConnected) return null;
    if (hasCompany) return null;

    return (
        <div className="flex flex-col gap-4 w-full">
            <Select
                variant="bordered"
                label="Select a company"
                items={companies}
                placeholder="Select a company to start playing"
                description="Should consider selecting a company"
                classNames={{
                    label: 'text-default-500',
                    innerWrapper: 'border-default-100',
                    popoverContent: 'bg-white',
                    listbox: 'text-black'
                }}
                startContent={<FaBuilding />}
                onSelectionChange={setRole}
            >
                {(company) =>
                    <SelectItem
                        className="light"
                        key={company.key}
                    >
                        {company.label}
                    </SelectItem>
                }
            </Select>
            <CAFButton
                color="primary"
                onPress={() => {
                    createCompany();
                }}
                isLoading={isCreating}
            >
                Create Company
            </CAFButton>
        </div>
    );
}