// src/interfaces/IMyOwnService.ts
export interface IMyOwnService {
    getMyTweets(): Promise<any[]>;
    isTweetLikedByMe(tweetId: string): Promise<boolean>;
    isTweetRetweetedByMe(tweetId: string): Promise<boolean>;
    isTweetCommentedByMe(tweetId: string): Promise<boolean>;
    isTweetHighlightedByMe(tweetId: string): Promise<boolean>;
}
