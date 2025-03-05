"use client";

import React from "react";
import { useCompanyActions } from "@/hooks/useCAFItems";
import { PlayerRole } from "@/types";
import { useAccount } from "wagmi";
import { Select, SelectItem } from "@heroui/react";
import { FaBuilding } from "react-icons/fa6";

export const companies = [
    {
        key: PlayerRole.COFFEE_COMPANY,
        label: 'Coffee Company'
    },
    {
        key: PlayerRole.MACHINE_COMPANY,
        label: 'Machine Company'
    },
    {
        key: PlayerRole.MATERIAL_COMPANY,
        label: 'Material Company'
    }
]
interface Props extends React.HTMLAttributes<HTMLFormElement> {
    hasCompany: boolean;
}
export const CreateCompanyForm: React.FC<Props> = (props) => {
    const { hasCompany } = props;
    const { create } = useCompanyActions();
    const { isConnected, address } = useAccount();
    const [owner, setOwner] = React.useState('');
    const [role, setRole] = React.useState<PlayerRole>(0);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log('owner', owner);
        console.log('role', role);
        try {
            await create(owner, role);
        } catch (error) {
            console.error('Error creating company', error);
        }
    }

    if (!isConnected) return null;
    if(hasCompany) return null;

    return (
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
        >
            {(company) =>
                <SelectItem
                    className="light"
                    key={company.key}
                >
                    {company.label}
                </SelectItem>}
        </Select>
    );
}