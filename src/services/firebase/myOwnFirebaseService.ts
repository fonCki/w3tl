import { IMyOwnService } from '@interfaces/IMyOwnService';


export class myOwnFirebaseService implements IMyOwnService {
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