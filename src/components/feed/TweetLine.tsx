import { Feed, Image } from 'semantic-ui-react';
import { Tweet } from '@models/tweet';
import Media from '@components/feed/Media';
import TweetMeta from './TweetMeta';
import TweetDropdown from './TweetDropdown';
import TweetSummary from './TweetSummary';
import SpecialContent from '@components/feed/SpecialContent';

interface TweetLineProps {
    tweet: Tweet;
}

const TweetLine: React.FC<TweetLineProps> = ({ tweet }) => {
    // ... state and functions ...
    return (


        <Feed.Event>
            <div className="bg-white flex justify-between align-middle w-full p-4 rounded-lg shadow hover:bg-gray-100">
                <Feed.Label>
                    <div className="w-16 h-16" >
                        <Image src={tweet.user.avatar} avatar size="large" />
                    </div>
                </Feed.Label>
                <Feed.Content className=" pr-4 pl-4 w-full">
                    <div className="flex justify-between">
                        <TweetSummary tweet={tweet} />
                    </div>
                    <div>


                    <Feed.Extra className="text-lg w-full mb-4 mt-2 text-justify">
                        <SpecialContent content={tweet.content} /> {/* Pass the actual users data */}
                    </Feed.Extra>
                    {tweet.image && <Media imageUrl={tweet.image} />}
                    {tweet.video && <Media videoUrl={tweet.video} />}
                    </div>
                    <TweetMeta
                        tweet={tweet}
                        onLike={handleLikeClick}
                        onRetweet={handleLikeClick}
                        onComment={handleLikeClick}
                    />
                </Feed.Content>
                <div>
                    <TweetDropdown />
                </div>
            </div>
        </Feed.Event>
    );
};


//create handle click to console log
const handleLikeClick = () => {
    console.log('Like');
}

export default TweetLine;
