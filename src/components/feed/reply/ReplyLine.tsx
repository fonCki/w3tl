import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { Reply } from '@models/reply';
import TweetDropdown from '@components/feed/TweetDropdown';
import Img from '@components/tools/image/Img';
import PostHeader from '@components/feed/PostHeader';
import SpecialContent from '@components/feed/SpecialContent';


interface ReplyLineProps {
    reply: Reply;
}

const ReplyLine: React.FC<ReplyLineProps> = ({ reply }) => {
    const [showActions, setShowActions] = useState(false);
    return (
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
                <Img userDetails={reply.user} />
            </div>
            <div className="flex-1">
                <PostHeader tweetOrReply={reply} />
                <div className="mt-1 text-gray-700">
                    <SpecialContent content={reply.content} /> {/* Pass the actual users data */}
                </div>
            </div>
            {showActions && (
                <div>
                    <TweetDropdown />
                </div>)}
        </div>
    );
};

export default ReplyLine;
