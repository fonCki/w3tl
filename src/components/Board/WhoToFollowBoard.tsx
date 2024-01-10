import React, { useState, useEffect } from 'react';
import { userService } from '@services/userService';
import { UserDetails } from '@models/UserDetails';
import ReusableCard from '@components/Board/ReusableCard'; // Import the reusable card component
import UserCardComponent from '@components/card/UserCard';

const WhoToFollow: React.FC = () => {
    const [activeUserIndex, setActiveUserIndex] = useState(0);
    const [users, setUsers] = useState<UserDetails[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await userService.getAllUsers();
            setUsers(fetchedUsers.map(user => ({
                ...user,
                ...userService.getUserProfile(user.id),
                followersCount: userService.getFollowers(user.id)?.length || 0,
                followingCount: userService.getFollowing(user.id)?.length || 0,
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
            onActionClick={handleNextUser}
            onShowMoreClick={handleNextUser}
        >
            {userCardContent}
        </ReusableCard>
    );
};

export default WhoToFollow;
