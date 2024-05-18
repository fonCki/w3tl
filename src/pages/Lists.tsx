import React, { useEffect, useState } from 'react';
import { routes } from '@constants/routesConfig';
import { ServiceFactory } from '@services/serviceFactory';
import FeedContainer from '../features/feed/components/FeedContainer';
import UserSmallAdCard from '@components/ui/cards/UserSmallAdCard';
import { User } from '@models/user/user';

/**
 * Represents a Lists component.
 *
 * @constructor
 */
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