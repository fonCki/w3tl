import  React from 'react';
import FeedContainer from './FeedContainer';
import TweetInput from './TweetInput';
import FeedComponent from './FeedComponent';

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

