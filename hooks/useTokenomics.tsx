import { useAccount } from "wagmi";
import { writeContract, readContract } from "@wagmi/core";
import CAFTokenAbi from "@/abis/CAFToken.json";
import constants from "@/utils/constants";
import wagmi from "@/utils/wagmi";

const contracts = constants.contracts;
const config = wagmi.wagmiConfig;

interface ICAFTokenActions {
    approve(amount: number): Promise<void>;
    balanceOf(): Promise<number>;
    transfer(to: string, amount: number): Promise<void>;
}

export const useCAFToken = (): ICAFTokenActions => {
    const account = useAccount();

    return {
        approve: async (amount: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFTokenAbi,
                    address: contracts.CAF_TOKEN_ADDRESS,
                    functionName: 'approve',
                    args: [contracts.CAF_MARKETPLACE_ADDRESS, amount],
                    account: account.address
                });
            } catch (error) {
                console.error('Error approving token', error);
            }
        },

        balanceOf: async (): Promise<number> => {
            try {
                const balance = await readContract(config, {
                    abi: CAFTokenAbi,
                    address: contracts.CAF_TOKEN_ADDRESS,
                    functionName: 'balanceOf',
                    args: [account.address]
                });

                return Number(balance);
            } catch (error) {
                console.error('Error getting balance', error);
                throw error;
            }
        },

        transfer: async (to: string, amount: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFTokenAbi,
                    address: contracts.CAF_TOKEN_ADDRESS,
                    functionName: 'transfer',
                    args: [to, amount],
                    account: account.address
                });
            } catch (error) {
                console.error('Error transferring token', error);
            }
        }
    };
};