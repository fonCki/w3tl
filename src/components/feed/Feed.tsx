import  React from 'react';
import FeedContainer from './FeedContainer';
import FeedHeader from './FeedHeader';
import FeedComponent from './FeedComponent';

const Feed = () => {
    return (
        <div>
            <FeedContainer>
                <FeedHeader />
            </FeedContainer>

            {/* Feed Component */}
            <FeedComponent />
        </div>
    );
}

export default Feed;

