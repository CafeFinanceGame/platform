import { useWriteContract } from 'wagmi'

export interface ICAFCompanyItems {
    create(owner: string, role: PlayerRole): Promise<number>;

    get(companyId: number): Promise<Company>;

    getByOwner(owner: string): Promise<number>;

    replenishEnergy(companyId: number, itemId: number): Promise<void>;

    useEnergy(companyId: number, amount: number): Promise<void>;

    role(companyId: number): Promise<PlayerRole>;

    energy(companyId: number): Promise<number>;

    isCompany(id: number): Promise<boolean>;

    hasCompany(owner: string): Promise<boolean>;
}
interface ICAFItemsActions {

}
