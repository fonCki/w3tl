import React, { useState, useEffect } from 'react';
import FeedTitle from '@components/feed/FeedTitle';
import FeedContainer from '@components/feed/FeedContainer';
import UserSmallAdCard from '@components/card/UserSmallAdCard';
import { User } from '@models/user/user';
import { Divider } from 'semantic-ui-react';
import { ServiceFactory } from '@services/serviceFactory';


interface SearchUsersProps {
    query: string;
}

const SearchUsers: React.FC<SearchUsersProps> = ({ query }) => {
    const [users, setUsers] = useState<User[]>([]); // State for storing users
    const userService = ServiceFactory.getUserService();

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await userService.searchUsers(query);
            setUsers(fetchedUsers); // Update state with fetched users
        };

        if (query) {
            fetchUsers();
        }
    }, [query]);

    return (
        <div>
            {users.length > 0 &&  /* Only show title if there are users */
                <><FeedTitle title="People" showUser={false} /><FeedContainer>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {users.map(user => (
                            <div key={user.userId} className="flex flex-col">
                                <UserSmallAdCard user={user} showWebsite={false} showJoined={false}
                                                 showFollowers={false}
                                                 showLocation={false} />
                            </div>
                        ))}
                    </div>
                </FeedContainer>
                <Divider/></>
            }
        </div>
    );
};

export default SearchUsers;
