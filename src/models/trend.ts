/**
 * Represents a Trend.
 * @interface
 */
export interface Trend {
    id: string;
    hashtag: string;
    category?: string;
    tweetsCount: number;
}
