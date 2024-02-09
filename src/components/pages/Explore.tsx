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

const Explore = () => {
    const title = routes.find(route => route.label === 'Explore')?.label;
    const [trends, setTrends] = useState<User[]>([]);
    const userService = ServiceFactory.getUserService();
    const { hasNewFollowing } = useSelector((state: RootState) => state.notifications);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchTrendsUsers = async () => {
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
    }, []);

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
            <FeedTitle title="Trending" showUser={false} />

            {/* Placeholder Content - Visible only when isLoading is true */}
            <div style={isLoading ? { display: 'block' } : { display: 'none' }}>
                <FeedContainer>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {Array.from({ length: 3 }).map((_, index) =>
                            <div key={index} className="flex flex-col">
                            <UserSmallAdCardPlaceholder key={index} />
                            </div>)}
                    </div>
                </FeedContainer>
            </div>

            {/* Placeholder Content - Visible only when isLoading is true */}
            <div style={isLoading ? { display: 'none' } : { display: 'block' }}>
                <FeedContainer>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {trends.map((user) => (
                            <div key={user.id} className="flex flex-col">
                                <UserSmallAdCard user={user} showWebsite={false} showJoined={false}
                                                 showFollowers={false} />
                            </div>
                        ))}
                    </div>
                </FeedContainer>
            </div>
            <FeedTitle title="Popular" showUser={false} />
        </div>
    );
};

export default Explore;