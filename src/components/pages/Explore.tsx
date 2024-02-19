import React, { useEffect, useState } from 'react';
import { useNavigationActions } from '@hooks/useNavigationActions';
import { routes } from '@constants/routesConfig';
import FeedTitle from '@components/feed/FeedTitle';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading as setDbLoading } from '@store/slices/loadingSlice';
import FeedContainer from '@components/feed/FeedContainer';
import UserSmallAdCard from '@components/card/UserSmallAdCard';
import { Divider } from 'semantic-ui-react';
import { RootState } from '@store/store';
import TweetLinePlaceHolder from '@components/feed/TweetLinePlaceHolder';
import UserSmallAdCardPlaceholder from '@components/UserSmallAdCardPlaceholder';
import TrendingBoard from '@components/board/TrendingBoard';

const Explore = () => {
    const title = routes.find(route => route.label === 'Explore')?.label;
    const [trends, setTrends] = useState<User[]>([]);
    const userService = ServiceFactory.getUserService();
    const { hasNewFollowing } = useSelector((state: RootState) => state.notifications);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTrendsUsers = async () => {
            setIsLoading(true);
            try {
                const trends = await userService.getTreandingUsers(9);
                if (trends) {
                    setTrends(trends);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrendsUsers();
    }, [hasNewFollowing]);

    return (
        <div>
            <FeedTitle title={title} showUser={false} />
            <Divider />
            <FeedTitle title="Popular" showUser={false} />

            {isLoading ? (
                <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
                    {Array.from({ length: 3 }, (_, index) => (
                        <div key={index} className="min-w-[30%]">
                            <UserSmallAdCardPlaceholder />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
                    {trends.map((user) => (
                        <div key={user.userId} className="min-w-[32%]">
                            <UserSmallAdCard user={user} showWebsite={false} showJoined={false} showFollowers={false} />
                        </div>
                    ))}
                </div>
            )}

            <FeedTitle title="Trending" showUser={false} />
            <TrendingBoard />
        </div>
    );
};

export default Explore;

