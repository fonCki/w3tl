import React, { useEffect, useState } from 'react';
import { User } from '@models/user/user';
import UserSmallAdCard from '@components/ui/cards/UserSmallAdCard';
import FeedContainer from '../features/feed/components/FeedContainer';
import { ServiceFactory } from '@services/serviceFactory';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import { useDispatch } from 'react-redux';

/**
 * Represents a functional component for rendering communities.
 */
const Communities = () => {
    const [trends, setTrends] = useState<User[]>([]);
    const userService = ServiceFactory.getUserService();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setDbLoading(true));
        const fetchTrendsUsers = async () => {
            try {
                const trends = await userService.getTrendingUsers(9);
                if (trends) {
                    setTrends(trends);
                }
            } catch (error) {
                console.error(error);
            } finally {
                dispatch(setDbLoading(false));
            }
        };
        fetchTrendsUsers();
    }, []);

    return (
        <FeedContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {trends.map((user) => (
                    <div key={user.userId} className="flex flex-col">
                        <UserSmallAdCard user={user} showWebsite={false} showJoined={false} showFollowers={false}/>
                    </div>
                ))}
            </div>
        </FeedContainer>
    );
};

export default Communities;