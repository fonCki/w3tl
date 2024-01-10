import tweetsMock from '@data/tweetsMock.json';
import commentsMock from '@data/commentsMock.json';

export const tweetService = {
    getTweetsByUserId(userId: number) {
        return tweetsMock.filter(tweet => tweet.user === userId);
    },

    getAllTweets() {
        return tweetsMock;
    },

    getTweetById(tweetId: number) {
        return tweetsMock.find(tweet => tweet.id === tweetId);
    },

    getCommentsByTweetId(tweetId: number) {
        return commentsMock.filter(comment => comment.tweetId === tweetId);
    }
};
