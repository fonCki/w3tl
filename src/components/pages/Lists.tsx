//Create explore default template
// Path: src/components/pages/Explore.tsx
import React, { useEffect, useState } from 'react';
import { useNavigationActions } from '@hooks/useNavigationActions';
import { routes } from '@constants/routesConfig';
import FeedTitle from '@components/feed/FeedTitle';
import { ServiceFactory } from '@services/serviceFactory';
import FeedContainer from '@components/feed/FeedContainer';
import UserSmallAdCard from '@components/card/UserSmallAdCard';
import { User } from '@models/user/user';

const Lists = () => {
    const title = routes.find(route => route.label === 'Lists')?.label;
    const userService = ServiceFactory.getUserService();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await userService.getAllUsers();
                if (users) {
                    setUsers(users);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <FeedContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {users.map((user) => (
                        <div key={user.userId} className="flex flex-col">
                            <UserSmallAdCard user={user} showWebsite={false} showJoined={false} showFollowers={false}/>
                        </div>
                    ))}
                </div>
            </FeedContainer>
        </div>
    );
};

export default Lists;