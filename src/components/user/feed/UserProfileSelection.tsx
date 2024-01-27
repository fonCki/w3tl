import React, { useState } from 'react';
import UserProfileTabs from './UserProfileTabs';
import FeedContainer from '@components/feed/FeedContainer';
// Import your individual tab components
import PostsTab from '@components/user/feed/tabs/PostTab';
import HighlightsTab from '@components/user/feed/tabs/HighlightsTab';
import LikedTab from '@components/user/feed/tabs/LikedTab';
import RepliesTab from '@components/user/feed/tabs/RepliesTab';
import MediaTab from '@components/user/feed/tabs/MediaTab';


interface UserProfileSelectionProps {
    username: number;
}
const UserProfileSelection: React.FC<UserProfileSelectionProps> = ({ userId }) => {
const tabList = ['Posts', 'Replies', 'Media', 'Likes'];
    const [activeTab, setActiveTab] = useState<string>(tabList[0]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Posts':
                return <PostsTab userId={userId} />;
            case 'Replies':
                return <RepliesTab userId={userId} />;
            case 'Highlights':
                 return <HighlightsTab userId={userId} />;
            case 'Media':
                return <MediaTab userId={userId} />;
            case 'Likes':
                return <LikedTab userId={userId} />;
            default:
                return null;  // or a default component
        }
    };

    return (
        <div>
            <div className="block">
                <FeedContainer decoration={false}>
                    <UserProfileTabs
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                        tabList={tabList}
                    />
                </FeedContainer>
            </div>
            <div>
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default UserProfileSelection;
