import React from 'react';
import FeedContainer from './FeedContainer';
import TweetInput from './post/TweetInput';
import FeedComponent from './FeedComponent';

/**
 * Represents a feed.
 * @constructor
 */
const Feed = () => {
    return (
        <div>
            <FeedContainer>
                <div>
                    <TweetInput onTweetPost={() => {console.log("Tweet posted")} } />
                </div>
            </FeedContainer>
            {/* Feed Component */}
            <FeedComponent />
        </div>
    );
}

export default Feed;

