import { Feed, Image } from 'semantic-ui-react';
import { Tweet } from '@models/tweet';
import Media from '@components/feed/Media';
import TweetMeta from './TweetMeta';
import TweetDropdown from './TweetDropdown';
import PostHeader from './PostHeader';
import SpecialContent from '@components/feed/SpecialContent';
import { useNavigate } from 'react-router-dom';
import Img from '@components/Tools/Image/Img';

interface TweetLineProps {
    tweet: Tweet;
}

const TweetLine: React.FC<TweetLineProps> = ({ tweet }) => {
    const navigate = useNavigate();

    // ... state and functions ...
    return (
        <Feed.Event>
            <div className="bg-white flex justify-between align-middle w-full p-4 rounded-lg shadow hover:bg-gray-100">
                <Feed.Label onClick={()=>navigate(`/user/${tweet.user.username}`)} className="cursor-pointer">
                    <div className="w-16 h-16" >
                        <Img userDetails={tweet.user} size="large" />
                    </div>
                </Feed.Label>
                <Feed.Content className=" pr-4 pl-4 w-full">
                    <div className="flex justify-between cursor-pointer" onClick={()=>navigate(`/user/${tweet.user.username}`)}>
                        <PostHeader tweetOrReply={tweet} />
                    </div>
                    <div>

                        <div className="cursor-pointer" onClick={()=>navigate(`/post/${tweet.id}`)}>
                    <Feed.Extra className="text-lg w-full mb-4 mt-2 text-justify">
                        <SpecialContent content={tweet.content} /> {/* Pass the actual users data */}
                    </Feed.Extra>
                    {tweet.image && <Media imageUrl={tweet.image} />}
                    {tweet.video && <Media videoUrl={tweet.video} />}
                    </div>
                        </div>
                    <TweetMeta
                        tweet={tweet}
                        onLike={handleLikeClick}
                        onRetweet={handleLikeClick}
                        onComment={handleLikeClick}
                        onHighlight={handleLikeClick}
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
