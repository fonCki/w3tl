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
import { ServiceFactory } from '@services/serviceFactory';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';


interface TweetLineProps {
    tweet: Tweet;
    highlightQuery?: string;

}

const TweetLine: React.FC<TweetLineProps> = ({ tweet, highlightQuery }) => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);


    // ... state and functions ...
    return (
        <Feed.Event
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            className="relative hover:bg-gray-100" // Add relative positioning here
            >
            <div className="bg-white flex justify-between align-middle w-full p-4 rounded-lg shadow hover:bg-gray-100 ">
                <Feed.Label onClick={()=>navigate(`/user/${tweet.user.username}`)} className="cursor-pointer">
                    <div className="w-16 h-16" >
                        <Img userDetails={tweet.user} size="small" />
                    </div>
                </Feed.Label>
                <Feed.Content className=" pr-4 pl-4 w-full">
                    <div className="flex justify-between cursor-pointer">
                        <PostHeader tweetOrReply={tweet} />
                    </div>
                    <div>
                        <div className="cursor-pointer" onClick={()=>navigate(`/post/${tweet.id}`)}>
                    <Feed.Extra className="text-lg w-full mb-4 mt-2 text-justify">
                        <SpecialContent content={tweet.content} highlightQuery={highlightQuery} />
                    </Feed.Extra>
                    {tweet.image && <Media imageUrl={tweet.image} />}
                    {tweet.video && <Media videoUrl={tweet.video} />}
                    </div>
                        </div>
                    <TweetMeta
                        tweet={tweet}
                    />

                </Feed.Content>
                <div className="min-w-8 ">
                    {showActions && (
                        <div className="w-full h-full flex-1 justify-between items-center ">
                            <TweetDropdown />
                        </div>
                    )}
                </div>
            </div>
        </Feed.Event>
    );
};

export default TweetLine;
