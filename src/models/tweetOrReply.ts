import { Tweet } from '@models/tweet';
import { Reply } from '@models/reply';

type TweetOrReply = {
    user: Tweet['user'] | Reply['user']; // Assuming User type is the same in both
    createdAt: Tweet['createdAt'] | Reply['createdAt'];
}

export type { TweetOrReply };