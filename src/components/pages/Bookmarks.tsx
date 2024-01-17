//Create default page
import React from 'react';
import HighlightsTab from '@components/user/feed/tabs/HighlightsTab';
import { myId } from '@services/userService';
import FeedTitle from '@components/feed/FeedTitle';
import FeedContainer from '@components/feed/FeedContainer';
import {routes} from '@constants/routesConfig';

const Bookmarks = () => {
    const title = routes.find(route => route.label === 'Bookmarks')?.label;
    return (
        <div>
            <FeedContainer decoration={false} >
                <FeedTitle title={title}  />
            </FeedContainer>
            <HighlightsTab userId={myId} />
        </div>
    );
};

export default Bookmarks;