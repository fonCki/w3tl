// src/services/mockMyOwnService.ts
import { IMyOwnService } from '@interfaces/IMyOwnService';
import { mockTweetService } from '@services/mock/mockTweetService';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

export const mockMyOwnService: IMyOwnService = {
    async getMyTweets() {
        // Implementation of fetching user's tweets
        // For now, returning an empty array
        return Promise.resolve([]);
    },

    async isTweetLikedByMe(tweetId: string) {
        const currentUser = useSelector((state: RootState) => state.auth.currentUser);
        const myId = currentUser?.id;
        return mockTweetService.isTweetLikedByUser(tweetId, myId!);
    },

    async isTweetRetweetedByMe(tweetId: string) {
        const currentUser = useSelector((state: RootState) => state.auth.currentUser);
        const myId = currentUser?.id;
        return mockTweetService.isTweetRetweetedByUser(tweetId, myId!);
    },

    async isTweetCommentedByMe(tweetId: string) {
        const currentUser = useSelector((state: RootState) => state.auth.currentUser);
        const myId = currentUser?.id;
        return mockTweetService.isTweetCommentedByUser(tweetId, myId!);
    },

    async isTweetHighlightedByMe(tweetId: string) {
        const currentUser = useSelector((state: RootState) => state.auth.currentUser);
        const myId = currentUser?.id;
        return mockTweetService.isTweetHighlightedByUser(tweetId, myId!);
    }
};

