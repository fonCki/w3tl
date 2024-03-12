
export interface ITweetActionService {
    postTweet(tweet:any, additionalData?: any): Promise<{ success: boolean; tweetId?: string; error?: string }>;
    likeTweet(userId:string, tweetId: string): Promise<{ success: boolean; error?: string }>;
    retweet(tweetId: string): Promise<{ success: boolean; error?: string }>;
    commentOnTweet(comment:any): Promise<{ success: boolean; error?: string }>;
    uploadMedia(file: File): Promise<{ success: boolean; downloadURL?: string; error?: string }>;
    deleteTweet(tweetId: string): Promise<{ success: boolean; error?: string }>;
    highlightTweet(userId:string, tweetId: string): Promise<{ success: boolean; error?: string }>;
}
