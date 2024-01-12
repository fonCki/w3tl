import  React from 'react';
import FeedContainer from './FeedContainer';
import TweetInputFeedHeader from './TweetInputFeedHeader';
import FeedComponent from './FeedComponent';

const Feed = () => {
    return (
        <div>
            <FeedContainer>
                <TweetInputFeedHeader />
            </FeedContainer>

            {/* Feed Component */}
            <FeedComponent />
        </div>
    );
}

export default Feed;

