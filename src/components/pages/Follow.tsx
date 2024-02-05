import React, { useState, useEffect } from 'react';
import UserLine from '@components/UserLine';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import FeedContainer from '@components/feed/FeedContainer';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';

const Follow = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [activeTab, setActiveTab] = useState('Followers');
    const userRelationService = ServiceFactory.getUserRelationsService();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            // dispatch(setDbLoading(true));
            if (activeTab === 'Followers') {
                const fetchedFollowers = await userRelationService.getFollowersAsUser(currentUser!.id);
                setUsers(fetchedFollowers);
            } else if (activeTab === 'Following') {
                const fetchedFollowing = await userRelationService.getFollowingAsUser(currentUser!.id);
                setUsers(fetchedFollowing);
            }
            // dispatch(setDbLoading(false));
        };
        fetchUsers();
    }, [activeTab, userRelationService, currentUser]);

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div>
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
            <div>
                {users.map(user => <UserLine key={user.id} user={user} />)}
            </div>
        </div>
    );
};

export default Follow;
