////Create  default template
import React, { useEffect, useState } from 'react';
import { userService } from '@services/userService';
import { UserFull } from '@models/user/userFull';
import UserCard from '@components/user/profile/User';
import UserSmallAdCard from '@components/card/UserSmallAdCard';
import FeedContainer from '@components/feed/FeedContainer';

const Lists = () => {
    const [trends, setTrends] = useState<UserFull[]>([]);

    useEffect(() => {
        const fetchTrendsUsers = async () => {
            try {
                const trends = await userService.getTopTenTreandingUsers();
                if (trends) {
                    setTrends(trends);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchTrendsUsers();
    }, []);

    return (
        <FeedContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {trends.map((user) => (
                    <div key={user.id} className="flex flex-col">
                        <UserSmallAdCard user={user} />
                    </div>
                ))}
            </div>
        </FeedContainer>
    );
};

export default Lists;