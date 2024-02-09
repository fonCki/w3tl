import { Feed, Image, Placeholder } from 'semantic-ui-react';
import { Tweet } from '@models/tweet';
import Media from '@components/feed/Media';
import TweetMeta from './TweetMeta';
import TweetDropdown from './TweetDropdown';
import PostHeader from './PostHeader';
import SpecialContent from '@components/feed/SpecialContent';
import { useNavigate } from 'react-router-dom';
import Img from '@components/tools/image/Img';
import { useEffect, useState } from 'react';
import { ServiceFactory } from '@services/serviceFactory';
import { defaultUser } from '@models/defaults';
import TweetLinePlaceHolder from '@components/feed/TweetLinePlaceHolder';


interface TweetLineProps {
    tweet: Tweet;
    highlightQuery?: string;

}

const TweetLine: React.FC<TweetLineProps> = ({ tweet, highlightQuery }) => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [user, setUser] = useState(defaultUser); // Assuming you might want to use the fetched user data
    const userServices = ServiceFactory.getUserService();
    const [postHeaderLoading, setPostHeaderLoading] = useState(true);



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await userServices.getUserById(tweet.userId);
                setUser(userData!);
                console.log('User data fetched:', userData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                console.log('PostHeader loaded with user:', user);
                // Set loading to false only if PostHeader has also finished loading
                if (!postHeaderLoading) {
                    setIsLoading(false);
                }
            }

        };

        fetchUserData();
    }, [tweet.userId, isLoading, postHeaderLoading]);

    const handlePostHeaderLoaded = () => {
        setPostHeaderLoading(false);
        // Check if user data is already fetched, then set isLoading to false
        if (user !== defaultUser) {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Placeholder Content - Visible only when isLoading is true */}
            <div style={isLoading ? {display: 'block'} : {display: 'none'} }>
                <TweetLinePlaceHolder />
            </div>

            {/* Final Content - Visible only when isLoading is false */}
            <div style={isLoading ? {display: 'none'} : {display: 'block'} }>
                <Feed.Event
                    onMouseEnter={() => setShowActions(true)}
                    onMouseLeave={() => setShowActions(false)}
                    className="relative hover:bg-gray-100" // Add relative positioning here
                >
                    <div
                        className="bg-white flex justify-between align-middle w-full p-4 rounded-lg shadow hover:bg-gray-100 ">
                        <Feed.Label onClick={() => navigate(`/user/${user}`)} className="cursor-pointer">
                            <div className="w-16 h-16">
                                <Img userDetails={user} size="small" onLoaded={handlePostHeaderLoaded} />
                            </div>
                        </Feed.Label>
                        <Feed.Content className=" pr-4 pl-4 w-full">
                            <div className="flex justify-between cursor-pointer">
                                <PostHeader tweetOrReply={tweet} user={user} />
                            </div>
                            <div>
                                <div className="cursor-pointer" onClick={() => navigate(`/post/${tweet.id}`)}>
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
            </div>
        </>);
};

export default TweetLine;
