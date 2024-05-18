/**
 * Represents a ML Service interface.
 * @interface
 */
export interface IMLService {
    checkProfanity(text: string): Promise<{ result: boolean; error?: string }>;
    getHashTags(text: string): Promise<string>;
}
