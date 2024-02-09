import { Tweet } from '@models/tweet';
import { Reply } from '@models/reply';

type TweetOrReply = {
    userId: Tweet['userId'] | Reply['userId'];
    createdAt: Tweet['createdAt'] | Reply['createdAt'];
    // Add other common properties here if necessary
};

export type { TweetOrReply };
