import 'isomorphic-fetch';
import { IMLService } from '@interfaces/IMLService';

export class PurgoMalumService implements IMLService {
    private readonly API_URL = 'https://community-purgomalum.p.rapidapi.com/containsprofanity';
    private readonly API_KEY = import.meta.env.VITE_RAPIDAPI_KEY; // Use environment variable
    private readonly API_HOST = 'community-purgomalum.p.rapidapi.com';

    async checkProfanity(text: string): Promise<{ result: boolean; error?: string }> {
        const params = new URLSearchParams({ text });
        const url = `${this.API_URL}?${params.toString()}`;
        console.log('API_KEY: ', this.API_KEY);

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': this.API_KEY!,
                    'X-RapidAPI-Host': this.API_HOST,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.text(); // PurgoMalum returns "true" or "false" as text
            return { result: data.trim() === 'true' };
        } catch (error: any) {
            console.error('Error fetching data from profanity');
            return { result: false, error: error.message };
        }
    }

    async getHashTags(text: string): Promise<string> {
        // Implementation for fetching hashtags if needed or return a mock value
        return '#Tag1';
    }
}
