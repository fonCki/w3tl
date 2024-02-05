import { IUserInteractionService } from '@interfaces/IUserInteractionService';


export class firebaseUserInteractionService implements IUserInteractionService {
    followUser(username: string): Promise<{ success: boolean; error?: any; }> {
        throw new Error('Method not implemented.');
    }

    unfollowUser(username: string): Promise<{ success: boolean; error?: any; }> {
        throw new Error('Method not implemented.');
    }

    blockUser(username: string): Promise<{ success: boolean; error?: any; }> {
        throw new Error('Method not implemented.');
    }

    unblockUser(username: string): Promise<{ success: boolean; error?: any; }> {
        throw new Error('Method not implemented.');
    }

    muteUser(username: string): Promise<{ success: boolean; error?: any; }> {
        throw new Error('Method not implemented.');
    }

    unmuteUser(username: string): Promise<{ success: boolean; error?: any; }> {
        throw new Error('Method not implemented.');
    }

    reportUser(username: string): Promise<{ success: boolean; error?: any; }> {
        throw new Error('Method not implemented.');
    }

    getMyTweets(): Promise<any[]> {
        return Promise.resolve([]);
    }

    isTweetCommentedByMe(tweetId: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    isTweetHighlightedByMe(tweetId: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    isTweetLikedByMe(tweetId: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    isTweetRetweetedByMe(tweetId: string): Promise<boolean> {
        return Promise.resolve(false);
    }
}