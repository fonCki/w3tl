import React, { useState, useEffect } from 'react';
import UserLine from '@components/UserLine';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import FeedContainer from '@components/feed/FeedContainer';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { resetHasNewFollower, resetHasNewFollowing } from '@store/slices/notificationsSlice';
import TweetLinePlaceHolder from '@components/feed/TweetLinePlaceHolder';

const Follow = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [activeTab, setActiveTab] = useState('Followers');
    const userRelationService = ServiceFactory.getUserRelationsService();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const { hasNewFollower, hasNewFollowing } = useSelector((state: RootState) => state.notifications);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            if (activeTab === 'Followers') {
                const fetchedFollowers = await userRelationService.getFollowersAsUser(currentUser!.id);
                setUsers(fetchedFollowers);
                dispatch(resetHasNewFollower());
            } else if (activeTab === 'Following') {
                const fetchedFollowing = await userRelationService.getFollowingAsUser(currentUser!.id);
                setUsers(fetchedFollowing);
                dispatch(resetHasNewFollowing());
            }
            setIsLoading(false);
        };
        fetchUsers();
    }, [activeTab]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (hasNewFollower && activeTab === 'Followers') {
                const fetchedFollowers = await userRelationService.getFollowersAsUser(currentUser!.id);
                setUsers(fetchedFollowers);
                dispatch(resetHasNewFollower());
            } else if (hasNewFollowing && activeTab === 'Following') {
                const fetchedFollowing = await userRelationService.getFollowingAsUser(currentUser!.id);
                setUsers(fetchedFollowing);
                dispatch(resetHasNewFollowing());
            }
        };
        fetchUsers();
    }, [hasNewFollower, hasNewFollowing]);

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <>
            {/* Final Content - Visible only when isLoading is false */}

            <FeedContainer decoration={true}>
                <ul className="flex cursor-pointer justify-around">
                    <li
                        className={`py-4 px-6 text-base sm:text-lg font-bold ${
                            activeTab === 'Followers'
                                ? 'border-b-2 border-custom-blue text-custom-blue'
                                : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                        }`}
                        onClick={() => handleTabClick('Followers')}
                    >
                        Followers
                    </li>
                    <li
                        className={`py-4 px-6 text-base sm:text-lg font-bold ${
                            activeTab === 'Following'
                                ? 'border-b-2 border-custom-blue text-custom-blue'
                                : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                        }`}
                        onClick={() => handleTabClick('Following')}
                    >
                        Following
                    </li>
                </ul>
            </FeedContainer>
        {/* Placeholder Content - Visible only when isLoading is true */}
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, index) =>
                        <TweetLinePlaceHolder key={index} /> )}
            </div>
            <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
                {users.map(user => <UserLine key={user.id} user={user} />)}
            </div>
        </>
    );
};

export default Follow;
