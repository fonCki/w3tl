import 'isomorphic-fetch'; // This adds fetch as a global
import { IMLService } from '@interfaces/IMLService';

// Define an interface for the API response
/**
 * Represents the response of a profanity check operation.
 *
 * @interface
 */
interface ProfanityCheckResponse {
    success: boolean;
    message: string;
}

/**
 * MachineLearningService is a class that provides machine learning services.
 * @implements {IMLService}
 */
export class MachineLearningService implements IMLService {
    PROFANITY_SERVICE = 'MLService/checkProfanity';

    async checkProfanity(text: string): Promise<{ result: boolean; error?: string }> {
        const url = `${import.meta.env.VITE_MACHINE_LEARNING_SERVICE_URL}/${this.PROFANITY_SERVICE}`;
        const params = new URLSearchParams({ text });

        try {
            const response = await fetch(`${url}?${params.toString()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json() as ProfanityCheckResponse;
            return { result: data.success }; // Use the 'success' property from the typed response
        } catch (error: any) {
            console.error('Error fetching data: ', error);
            return { result: false, error: error.message };
        }
    }

    async getHashTags(text: string): Promise<string> {
        return '#Tag1';
    }
}
