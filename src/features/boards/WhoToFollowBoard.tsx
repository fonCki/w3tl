import React, { useEffect, useState } from 'react';
import UserCardComponent from '@components/ui/cards/UserSmallAdCard';
import ReusableCard from '@components/ui/cards/ReusableCard';
import { User } from '@models/user/user';
import { ServiceFactory } from '@services/serviceFactory';

/**
 * Component that displays a list of trending users to follow.
 * Uses a service to fetch the users and updates the displayed user every 15 seconds.
 * Renders a reusable card with the title "Who to Follow" and the current user information.
 *
 * @component
 * @example
 * return (
 *   <WhoToFollow />
 * )
 */
const WhoToFollow: React.FC = () => {
    const [activeUserIndex, setActiveUserIndex] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const userService = ServiceFactory.getUserService();


    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await userService.getTrendingUsers(10);
            setUsers(fetchedUsers);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveUserIndex((currentIndex) => (currentIndex + 1) % users.length);
        }, 15000);
        return () => clearInterval(interval);
    }, [users.length]);

    const userCardContent = users.length > 0 ? (
        <UserCardComponent user={users[activeUserIndex]} />
    ) : null;

    return (
        <ReusableCard
            title="Who to Follow"
            onActionClick={() => {}}
            onShowMoreClick={() => {}}
        >
            {userCardContent}
        </ReusableCard>
    );
};

export default WhoToFollow;
