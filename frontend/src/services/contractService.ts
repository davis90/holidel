import type {Contract} from "../types/contract";

export const contractService = {
    async loadContract(): Promise<Contract> {
        try {
            const response = await fetch('/static/contract.md');
            if (!response.ok) {
                throw new Error(`Failed to load contract: ${response.statusText}`);
            }
            const data: string = await response.text();
            return {title: 'contract', content: data};
        } catch (error) {
            console.error('Error loading contract:', error);
            throw error;
        }
    }
};
