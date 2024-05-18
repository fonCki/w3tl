import React, { useEffect, useState } from 'react';
import FeedTitle from '../../feed/components/FeedTitle';
import FeedContainer from '../../feed/components/FeedContainer';
import UserSmallAdCard from '@components/ui/cards/UserSmallAdCard';
import { User } from '@models/user/user';
import { Divider } from 'semantic-ui-react';
import { ServiceFactory } from '@services/serviceFactory';

/**
 * Represents the properties for searching users.
 * @interface
 */
interface SearchUsersProps {
    query: string;
}

/**
 * Component for searching users and displaying them in a grid.
 *
 * @component
 * @param {Object} props - The properties of the SearchUsers component.
 * @param {string} props.query - The search query.
 * @returns {JSX.Element} - The SearchUsers component.
 */
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
