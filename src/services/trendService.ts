import trendsMock from '@data/trendsMock.json';
import tweetsMock from '@data/tweetsMock.json';

export const trendService = {
    getAllTrends() {
        return trendsMock;
    },

    getTrendByHashtag(hashtag: string) {
        const trend = trendsMock.find(trend => trend.hashtag === hashtag);
        if (!trend) return null;

        const relatedTweets = tweetsMock.filter(tweet => tweet.content.includes(`#${hashtag}`));
        return {
            ...trend,
            relatedTweets
        };
    },
    getLastFiveTrends() {
        //return the five sorted by most  "tweetsCount"
        return trendsMock.sort((a, b) => b.tweetsCount - a.tweetsCount).slice(0, 5);
    }
};
