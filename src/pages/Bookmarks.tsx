//Create default page
import React from 'react';
import HighlightsTab from '../features/user/tabs/HighlightsTab';
import FeedTitle from '../features/feed/components/FeedTitle';
import { routes } from '@constants/routesConfig';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

/**
 * Bookmarks component is responsible for rendering the bookmarks page.
 */
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