import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { Comment } from '@models/comment';
import TweetDropdown from '@components/feed/TweetDropdown';
import Img from '@components/tools/image/Img';
import PostHeader from '@components/feed/PostHeader';
import SpecialContent from '@components/feed/SpecialContent';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import TweetLinePlaceHolder from '@components/feed/TweetLinePlaceHolder';
import { ServiceFactory } from '@services/serviceFactory';
import { defaultUser } from '@models/defaults';


interface ReplyLineProps {
    reply: Comment;
}

const ReplyLine: React.FC<ReplyLineProps> = ({ reply }) => {
    const [showActions, setShowActions] = useState(false);
    const [postHeaderLoading, setPostHeaderLoading] = useState(true);
    const [user, setUser] = useState(defaultUser); // Assuming you might want to use the fetched user data
    const [isLoading, setIsLoading] = useState(true);
    const userServices = ServiceFactory.getUserService();

    // fetch the user from the reply.userId
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await userServices.getUserById(reply.userId);
                setUser(userData!);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                if (!postHeaderLoading) {
                    setIsLoading(false);
                }
            }
        }
        fetchUserData();
    }, []);

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
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                <TweetLinePlaceHolder />
            </div>

            {/* Final Content - Visible only when isLoading is false */}
            <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
                <div
                    className=" bg-white flex items-center space-x-4 p-4 border-b border-gray-200 rounded-lg shadow hover:bg-gray-100"
                    onMouseEnter={() => setShowActions(true)}
                    onMouseLeave={() => setShowActions(false)}
                >
                    <div className="flex justify-center">
                <span className="mx-2 h-full ">
                    <Icon name="arrows alternate vertical" size="large" color="grey" />
                </span>
                    </div>
                    <div className="flex-shrink-0">
                        <Img userDetails={user} onLoaded={handlePostHeaderLoaded} />
                    </div>
                    <div className="flex-1">
                        <PostHeader tweetOrReply={reply} user={user!} />
                        <div className="mt-1 text-gray-700">
                            <SpecialContent content={reply.content} /> {/* Pass the actual users data */}
                        </div>
                    </div>
                    <div className="flex flex-col h-max space-between  h-max">
                        <div className="h-5">
                            {showActions && (<TweetDropdown />)}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ReplyLine;
