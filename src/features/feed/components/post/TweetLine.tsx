import { Feed } from 'semantic-ui-react';
import { Tweet } from '@models/post/tweet';
import Media from '@features/feed/components/Media';
import TweetMeta from '@features/feed/components/post/TweetMeta';
import TweetDropdown from '@features/feed/components/post/TweetDropdown';
import PostHeader from '@features/feed/components/PostHeader';
import SpecialContent from '@features/feed/components/SpecialContent';
import { useNavigate } from 'react-router-dom';
import Img from '@components/tools/image/Img';
import { useEffect, useState } from 'react';
import { ServiceFactory } from '@services/serviceFactory';
import { defaultUser } from '@models/defaults';
import TweetLinePlaceHolder from '@features/feed/components/post/TweetLinePlaceHolder';
import { useScreenSize } from '@hooks/useScreenSize';

/**
 * Represents the properties for the TweetLine component.
 */
interface TweetLineProps {
    tweet: Tweet;
    highlightQuery?: string;

}

/**
 * TweetLine component represents a single tweet in the feed.
 *
 * @component
 * @param {object} tweet - The data of the tweet to be displayed
 * @param {string} highlightQuery - The query string used for highlighting search keywords in the tweet content
 * @returns {JSX.Element} - The rendered tweet line component
 */
const TweetLine: React.FC<TweetLineProps> = ({ tweet, highlightQuery }) => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [user, setUser] = useState(defaultUser); // Assuming you might want to use the fetched user data
    const userServices = ServiceFactory.getUserService();
    const [postHeaderLoading, setPostHeaderLoading] = useState(true);
    // Screen size hook to determine device type
    const { isMobile, isTablet } = useScreenSize();

    // This combines the mobile and tablet checks into a single boolean for easier use
    const isTouchDevice = isMobile || isTablet;

    // Event handlers modified to be conditionally applied based on device type
    const handleMouseEnter = () => !isTouchDevice && setShowActions(true);
    const handleMouseLeave = () => !isTouchDevice && setShowActions(false);




    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await userServices.getUserById(tweet.userId);
                setUser(userData!);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
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

    const handleclick = () => {
        navigate(`/post/${tweet.postId}`);

    }

    return (
        <>
            {/* Placeholder Content - Visible only when isLoading is true */}
            <div style={isLoading ? {display: 'block'} : {display: 'none'} }>
                <TweetLinePlaceHolder />
            </div>
            {/* Final Content - Visible only when isLoading is false */}
            <div style={isLoading ? {display: 'none'} : {display: 'block'} }>
                <Feed.Event
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative hover:bg-gray-100"
                >
                    <div
                        className=" flex justify-between align-middle w-full p-4 rounded-lg ">
                        <Feed.Label onClick={handleclick} className="cursor-pointer">
                            <div className="w-16 h-16">
                                <Img userDetails={user} size="small" onLoaded={handlePostHeaderLoaded} />
                            </div>
                        </Feed.Label>
                        <Feed.Content className=" pr-4 pl-4 w-full">
                            <div className="flex justify-between cursor-pointer ">
                                <PostHeader tweetOrReply={tweet} user={user} />
                            </div>
                            <div>
                                <div className="cursor-pointer" onClick={() => navigate(`/post/${tweet.postId}`)}>
                                    <Feed.Extra className="text-lg w-full  mt-2 text-justify">
                                        <SpecialContent content={tweet.content} highlightQuery={highlightQuery} />
                                    </Feed.Extra>
                                    {tweet.mediaType && <Media imageUrl={tweet.mediaUrl} />}
                                    {/*{tweet.video && <Media videoUrl={tweet.video} />}*/}
                                </div>
                            </div>
                        </Feed.Content>
                        <div className="min-w-8 ">
                            {(showActions || isTouchDevice) && (
                                <div className="w-full h-full flex-1 justify-between items-center">
                                    <TweetDropdown />
                                </div>)}
                        </div>
                    </div>
                    <div className=" md:px-16">
                    <TweetMeta
                        tweet={tweet}
                    />
                    </div>
                </Feed.Event>
            </div>
        </>);
};

export default TweetLine;
