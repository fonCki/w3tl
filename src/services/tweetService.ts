import tweetsMock from '@data/tweetsMock';
import commentsMock from '@data/repliesMock';
import userRelationsMock from '@data/userRelationsMock';


//TODO fetch my user id from the local storage
const myId = 11;


export const tweetService = {
    async getTweetsByUserId(userId: number) {
        return tweetsMock.filter(tweet => tweet.user.id === userId);
    },

    async getAllTweets() {
        return tweetsMock;
    },

    async searchTweets(query: string) {
        return tweetsMock.filter(tweet => tweet.content.toLowerCase().includes(query.toLowerCase()));
    },

    async searchTweetsWithLimit(query: string, limit: number) {
        const tweets = tweetsMock.filter(tweet => tweet.content.toLowerCase().includes(query.toLowerCase()));
        const sortedTweets = tweets.sort((tweet1, tweet2) => {
            const tweet1ExactMatch = tweet1.content.toLowerCase() === query.toLowerCase();
            const tweet2ExactMatch = tweet2.content.toLowerCase() === query.toLowerCase();
            if (tweet1ExactMatch && !tweet2ExactMatch) {
                return -1;
            }
            if (!tweet1ExactMatch && tweet2ExactMatch) {
                return 1;
            }
            return 0;
        });
        return sortedTweets.slice(0, limit);
    },

    async getTweetById(tweetId: number) {
        return tweetsMock.find(tweet => tweet.id === tweetId);
    },

    async getTweetsWithMedia() {
        return tweetsMock.filter(tweet => tweet.image !== null || tweet.video !== null || (tweet.image !== "" || tweet.video !== ""));
    },

    async getAllTweetsThatUserLikes(userId: number) {
        const userRelation = userRelationsMock.find(relation => relation.userId === userId);
        return userRelation ? tweetsMock.filter(tweet => userRelation.likedTweetIds.includes(tweet.id)) : [];
    },

    async getAllTweetsThatUserRetweets(userId: number) {
        const userRelation = userRelationsMock.find(relation => relation.userId === userId);
        return userRelation ? tweetsMock.filter(tweet => userRelation.retweetedTweetIds.includes(tweet.id)) : [];
    },

    async getAllTweetsThatUserComments(userId: number) {
        const userRelation = userRelationsMock.find(relation => relation.userId === userId);
        return userRelation ? tweetsMock.filter(tweet => commentsMock.some(comment => comment.user.id === userId && comment.parentTweetId === tweet.id)) : [];
    },

    async getAllTweetsThatUserHighlights(userId: number) {
        const userRelation = userRelationsMock.find(relation => relation.userId === userId);
        return userRelation ? tweetsMock.filter(tweet => userRelation.highlightedTweetIds.includes(tweet.id)) : [];
    },

    async isTweetLikedByUser(tweetId: number, userId: number) {
        const userRelation = userRelationsMock.find(relation => relation.userId === userId);
        return userRelation ? userRelation.likedTweetIds.includes(tweetId) : false;
    },

    async isTweetRetweetedByUser(tweetId: number, userId: number) {
        const userRelation = userRelationsMock.find(relation => relation.userId === userId);
        return userRelation ? userRelation.retweetedTweetIds.includes(tweetId) : false;
    },

    async isTweetCommentedByUser(tweetId: number, userId: number) {
        const userRelation = userRelationsMock.find(relation => relation.userId === userId);
        return userRelation ? commentsMock.some(comment => comment.user.id === userId && comment.parentTweetId === tweetId) : false;
    },

    async isTweetHighlightedByUser(tweetId: number, userId: number) {
        const userRelation = userRelationsMock.find(relation => relation.userId === userId);
        return userRelation ? userRelation.highlightedTweetIds.includes(tweetId) : false;

    },

    async isTweetLikedByMe(tweetId: number) {
        return this.isTweetLikedByUser(tweetId, myId);
    },

    async isTweetRetweetedByMe(tweetId: number) {
        return this.isTweetRetweetedByUser(tweetId, myId);
    },

    async isTweetCommentedByMe(tweetId: number) {
        return this.isTweetCommentedByUser(tweetId, myId);
    },

    async isTweetHighlightedByMe(tweetId: number) {
        return this.isTweetHighlightedByUser(tweetId, myId);
    },

    async getReplyById(replyId: number) {
        return commentsMock.find(reply => reply.id === replyId);
    },
    async getAllReplysByTweetId(tweetId: number) {
        return commentsMock.filter(reply => reply.parentTweetId === tweetId);
    },
    async getHowManyReplysByTweetId(tweetId: number) {
        return commentsMock.filter(reply => reply.parentTweetId === tweetId).length;
    },
    async getAllReplyByUserId(userId: number) {
        return commentsMock.filter(reply => reply.user.id === userId);
    },
};
