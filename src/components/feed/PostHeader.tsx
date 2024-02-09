import React, { useEffect, useState } from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { formatDistanceToNow } from 'date-fns';
import { Tweet } from '@models/tweet';
import { TweetOrReply } from '@models/tweetOrReply';
import { useNavigate } from 'react-router-dom';
import { ServiceFactory } from '@services/serviceFactory';
import { defaultUser } from '@models/defaults';
import { User } from '@models/user/user';

interface TweetSummaryProps {
    tweetOrReply: TweetOrReply;
    user: User;
}

const PostHeader: React.FC<TweetSummaryProps> = ({ tweetOrReply, user }) => {

    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(`/user/${user}`)} className="cursor-pointer">
        <Feed.Summary>
            <span className="font-bold mr-2 text-xl">{user.name + ' ' + user.lastname}</span>
            {user.verified && <Icon name="check circle" className="text-blue ml-1" />}
            <span className="text-gray-500">@{user.username}</span>
            <span className="text-gray-500 ml-2">·</span>
            <span className="text-gray-500 ml-2">
                {formatDistanceToNow(tweetOrReply.createdAt, { addSuffix: true })}
            </span>
        </Feed.Summary>
        </div>
    );
};

export default PostHeader;
