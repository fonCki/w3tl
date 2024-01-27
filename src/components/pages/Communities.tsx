import React, { useEffect, useState } from 'react';
import { UserFull } from '@models/user/userFull';
import UserSmallAdCard from '@components/card/UserSmallAdCard';
import FeedContainer from '@components/feed/FeedContainer';
import { ServiceFactory } from '@services/serviceFactory';

const Communities = () => {
    const [trends, setTrends] = useState<UserFull[]>([]);
    const userService = ServiceFactory.getUserService();


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
                        <UserSmallAdCard user={user} showWebsite={false} showJoined={false} showFollowers={false}/>
                    </div>
                ))}
            </div>
        </FeedContainer>
    );
};

export default Communities;