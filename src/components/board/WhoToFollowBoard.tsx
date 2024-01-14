import React, { useState, useEffect } from 'react';
import { userService } from '@services/userService';
import { UserFull } from '@models/user/userFull';
import ReusableCard from '@components/board/ReusableCard'; // Import the reusable card component
import UserCardComponent from '@components/card/UserSmallAdCard';

const WhoToFollow: React.FC = () => {
    const [activeUserIndex, setActiveUserIndex] = useState(0);
    const [users, setUsers] = useState<UserFull[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await userService.getAllUsers();
            setUsers(fetchedUsers.map(user => ({
                ...user,
                ...userService.getUserProfile(user.id),
                followersCount: userService.getFollowers(user.id)?.length || 0,
                followingCount: userService.getFollowing(user.id)?.length || 0,
                createdAt: new Date(user.createdAt)
            })));
        };
        fetchUsers();
    }, []);

    const handleNextUser = () => {
        setActiveUserIndex((currentIndex) => (currentIndex + 1) % users.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextUser();
        }, 15000);
        return () => clearInterval(interval);
    }, [handleNextUser]);

    const userCardContent = users.length > 0 ? (
        <UserCardComponent user={users[activeUserIndex]} />
    ) : null;

    return (
        <ReusableCard
            title="Who to Follow"
            onActionClick={() => console.log('Who to follow action clicked')}
            onShowMoreClick={() => console.log('Show more clicked')}
        >
            {userCardContent}
        </ReusableCard>
    );
};

export default WhoToFollow;
