
import React, { useEffect, useState } from 'react';
import { useNavigationActions } from '@hooks/useNavigationActions';
import { routes } from '@constants/routesConfig';
import FeedTitle from '@components/feed/FeedTitle';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch } from 'react-redux';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import FeedContainer from '@components/feed/FeedContainer';
import UserSmallAdCard from '@components/card/UserSmallAdCard';
import { Divider } from 'semantic-ui-react';

const Explore = () => {
    const title = routes.find(route => route.label === 'Explore')?.label;
    const [trends, setTrends] = useState<User[]>([]);
    const userService = ServiceFactory.getUserService();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setDbLoading(true));
        const fetchTrendsUsers = async () => {
            try {
                const trends = await userService.getTreandingUsers(9)
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
        <div>
            <FeedTitle title={title} showUser={false} />
            <Divider />
            <FeedTitle title="Trending" showUser={false} />
            <FeedContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {trends.map((user) => (
                        <div key={user.id} className="flex flex-col">
                            <UserSmallAdCard user={user} showWebsite={false} showJoined={false} showFollowers={false}/>
                        </div>
                    ))}
                </div>
            </FeedContainer>
            <FeedTitle title="Popular" showUser={false} />
        </div>
    );
};

export default Explore;