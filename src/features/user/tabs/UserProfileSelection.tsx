import React, { useState } from 'react';
import UserProfileTabs from './UserProfileTabs';
import FeedContainer from '../../feed/components/FeedContainer';
import PostsTab from './PostTab';
import HighlightsTab from './HighlightsTab';
import LikedTab from './LikedTab';
import RepliesTab from './RepliesTab';
import MediaTab from './MediaTab';


/**
 * Interface representing the props for the UserProfileSelection component.
 *
 * @interface UserProfileSelectionProps
 */
interface UserProfileSelectionProps {
    userId: string;
}

/**
 * UserProfileSelection component displays the user profile tabs and the content of the active tab.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.userId - The user ID.
 * @returns {JSX.Element} - The rendered component.
 */
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
