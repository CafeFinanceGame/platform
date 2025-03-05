import { create } from 'zustand'
import { Company, PlayerRole } from '@/types'

type CompanyState = {
    id: number;
    name?: string;
    avatar?: string;
} & Company;

interface ICompanyStore {
    company: CompanyState;
    setCompany: (company: CompanyState) => void;
}

export const useCompanyStore = create<ICompanyStore>((set) => ({
    company: {
        id: 0,
        energy: 0,
        owner: '',
        role: PlayerRole.NONE
    },
    setCompany: (company) => set({ company })
}))