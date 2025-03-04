"use client";

import { useCompanyActions } from "@/hooks/useCAFItems";
import { PlayerRole } from "@/types";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLFormElement> { }
export const CreateCompanyForm: React.FC<Props> = () => {
    const { create } = useCompanyActions();
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
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Owner" onChange={(e) => setOwner(e.target.value)} />
            <input type="text" placeholder="Role" onChange={(e) => setRole(e.target.value as unknown as PlayerRole)} />
            <button type="submit">Create
            </button>
        </form>
    )
}