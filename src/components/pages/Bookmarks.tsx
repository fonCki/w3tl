//Create default page
import React from 'react';
import HighlightsTab from '@components/user/feed/tabs/HighlightsTab';
import FeedTitle from '@components/feed/FeedTitle';
import FeedContainer from '@components/feed/FeedContainer';
import {routes} from '@constants/routesConfig';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

const Bookmarks = () => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const myId = currentUser?.userId;
    const title = routes.find(route => route.label === 'Bookmarks')?.label;
    return (
        <div>
            {/*<FeedContainer decoration={false} >*/}
                <FeedTitle title={title}  />
            {/*</FeedContainer>*/}
            <HighlightsTab userId={myId!} />
        </div>
    );
};

export default Bookmarks;