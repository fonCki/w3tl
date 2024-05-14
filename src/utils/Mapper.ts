import { Tweet } from '@models/tweet';

export const JsonToTweet;
(json: any): Tweet
{
    return new Tweet(
        json.id,
        json.userId,
        json.content,
        json.createdAt,
        json.likes,
        json.retweets,
        json.replies,
        json.media,
    );