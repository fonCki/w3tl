//Create default page
import React from 'react';
import HighlightsTab from '@components/user/feed/tabs/HighlightsTab';
import { myId } from '@services/userService';

const Bookmarks = () => {
    return (
        <HighlightsTab userId={myId} />
    );
};

export default Bookmarks;