import { useAccount } from "wagmi";
import type { Address } from "viem";
import { writeContract, readContract } from "@wagmi/core";
import CAFTokenAbi from "@/abis/CAFToken";
import constants from "@/utils/constants";
import wagmi from "@/utils/wagmi";

const contracts = constants.contracts;
const config = wagmi.wagmiConfig;

interface ICAFTokenActions {
    approve(amount: number): Promise<void>;
    balanceOf(owner: string): Promise<number>;
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
                    args: [contracts.CAF_MARKETPLACE_ADDRESS, BigInt(amount)],
                    account: account.address
                });
            } catch (error) {
                console.error('Error approving token', error);
            }
        },

        balanceOf: async (owner: string): Promise<number> => {
            if (!owner) {
                throw new Error('Error getting balance: Owner address is required');
            }

            try {
                const balance = await readContract(config, {
                    abi: CAFTokenAbi,
                    address: contracts.CAF_TOKEN_ADDRESS,
                    functionName: 'balanceOf',
                    args: [owner as Address]
                });

                return Number(balance);
            } catch (error) {
                console.error('Error getting balance', error);
                throw error;
            }
        },

        transfer: async (to: string, amount: number): Promise<void> => {
            if (!to) {
                throw new Error('Error transferring token: Recipient address is required');
            }

            try {
                await writeContract(config, {
                    abi: CAFTokenAbi,
                    address: contracts.CAF_TOKEN_ADDRESS,
                    functionName: 'transfer',
                    args: [to as Address, BigInt(amount)],
                    account: account.address
                });
            } catch (error) {
                console.error('Error transferring token', error);
            }
        }
    };
};