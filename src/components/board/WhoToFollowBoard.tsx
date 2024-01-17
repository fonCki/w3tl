import React, { useState, useEffect } from 'react';
import { userService } from '@services/userService';
import UserCardComponent from '@components/card/UserSmallAdCard';
import ReusableCard from '@components/board/ReusableCard';
import { UserFull } from '@models/user/userFull';

const WhoToFollow: React.FC = () => {
    const [activeUserIndex, setActiveUserIndex] = useState(0);
    const [users, setUsers] = useState<UserFull[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await userService.getTopTenTreandingUsers();
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
