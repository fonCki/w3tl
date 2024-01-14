import { Feed, Image } from 'semantic-ui-react';
import { Tweet } from '@models/tweet';
import Media from '@components/feed/Media';
import TweetMeta from './TweetMeta';
import TweetDropdown from './TweetDropdown';
import PostHeader from './PostHeader';
import SpecialContent from '@components/feed/SpecialContent';
import { useNavigate } from 'react-router-dom';
import Img from '@components/tools/image/Img';
import { useState } from 'react';


interface TweetLineProps {
    tweet: Tweet;
}

const TweetLine: React.FC<TweetLineProps> = ({ tweet }) => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);

    // Handle the click events for icons
    const handleHighlightClick = () => {
        console.log('Highlight');
        // Implement your highlight functionality
    };

    const handleShareClick = () => {
        console.log('Share');
        // Implement your share functionality
    };

    // ... state and functions ...
    return (
        <Feed.Event
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            className="relative hover:bg-gray-100" // Add relative positioning here
            >
            <div className="bg-white flex justify-between align-middle w-full p-4 rounded-lg shadow hover:bg-gray-100">
                <Feed.Label onClick={()=>navigate(`/user/${tweet.user.username}`)} className="cursor-pointer">
                    <div className="w-16 h-16" >
                        <Img userDetails={tweet.user} size="large" />
                    </div>
                </Feed.Label>
                <Feed.Content className=" pr-4 pl-4 w-full">
                    <div className="flex justify-between cursor-pointer">
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
                <div className="min-w-8 ">
                    {showActions && (
                        <div className="w-full h-full flex-1 justify-between items-center ">
                            <TweetDropdown />
                        {/*<div >*/}
                        {/*    <button onClick={handleHighlightClick} className="hover:text-blue-500 transition-colors">*/}
                        {/*        <AiOutlineHighlight />*/}
                        {/*    </button>*/}
                        {/*    <button onClick={handleShareClick} className="hover:text-blue-500 transition-colors">*/}
                        {/*        <AiOutlineShareAlt />*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        </div>
                    )}
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
