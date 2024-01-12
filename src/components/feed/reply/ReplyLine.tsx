import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Reply } from '@models/reply';
import TweetDropdown from '@components/feed/TweetDropdown';
import Img from '@components/Tools/Image/Img';
import PostHeader from '@components/feed/PostHeader';
import SpecialContent from '@components/feed/SpecialContent';

interface ReplyLineProps {
    reply: Reply;
}

const ReplyLine: React.FC<ReplyLineProps> = ({ reply }) => {
    return (
        <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
            <div className="flex justify-center">
                <span className="mx-2 h-full ">
                    <Icon name="arrows alternate vertical" size="large" color="grey" />
                </span>
            </div>
            <div className="flex-shrink-0">
                <Img userDetails={reply.user} size="mini" />
            </div>
            <div className="flex-1">
                <PostHeader tweetOrReply={reply} />
                <div className="mt-1 text-gray-700">
                    <SpecialContent content={reply.content} /> {/* Pass the actual users data */}
                </div>
            </div>
            <div>
                <TweetDropdown />
            </div>
        </div>
    );
};

export default ReplyLine;
