import { Trend } from '@models/trend';
import { Tweet } from '@models/post/tweet';

/**
 * Represents a mock data for trends.
 * @typedef {Object} Trend
 * @property {string} name - The name of the trend.
 * @property {number} count - The count of the trend.
 */
let trendsMock: Trend[] = [];
/**
 * Mock data for tweets.
 *
 * @type {Tweet[]}
 */
let tweetsMock: Tweet[] = []; // Replace 'any' with your Tweet interface if available

/**
 * Provides methods for managing trends and related tweets.
 * @namespace
 */
export const trendService = {

    setTrendsMock(trends: Trend[]) {
        trendsMock = trends;
    },

    setTweetsMock(tweets: Tweet[]) { // Replace 'any' with your Tweet interface if available
        tweetsMock = tweets;
    },

    // Note: trendsMock array initialization should not be inside trendService object literal
    getAllTrends() {
        return trendsMock;
    },

    getTrendByHashtag(hashtag: string) {
        const trend = trendsMock.find(trend => trend.hashtag === hashtag);
        if (!trend) return null;

        const relatedTweets = tweetsMock.filter(tweet => tweet.content && tweet.content.includes(`#${hashtag}`));
        return {
            ...trend,
            relatedTweets
        };
    },

    getLastFiveTrends() {
        // Return the five sorted by most "tweetsCount"
        return trendsMock.sort((a, b) => b.tweetsCount - a.tweetsCount).slice(0, 5);
    }
};

// Initialization of trendsMock moved outside the service definition
/**
 * Represents a mock object for trends data.
 * This object provides methods for retrieving and updating trends information.
 * @class
 */
trendsMock = [
    {
        id: "1",
        hashtag: "BlackLivesMatter",
        category: "Social Justice",
        tweetsCount: 1000,
    },
    {
        id: "2",
        hashtag: "COVID19",
        category: "Health",
        tweetsCount: 500,
    },
    {
        id: "3",
        hashtag: "ClimateChange",
        category: "Environment",
        tweetsCount: 300,
    },
    {
        id: "4",
        hashtag: "Election2020",
        category: "Politics",
        tweetsCount: 200,
    },
    {
        id: "5",
        hashtag: "Olympics",
        category: "Sports",
        tweetsCount: 100,
    },
];