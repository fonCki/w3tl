// /hooks/useSearch.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setSearchQuery, setSearchResults } from '@store/slices/searchSlice';
import { DataItem } from '@models/dataItem'; // Import the DataItem type
import { User } from '@models/user/user'; // Assuming this is your User model
import { Tweet } from '@models/tweet';
import { ServiceFactory } from '@services/serviceFactory';

export const useSearch = () => {
    const LIMIT = 5;
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const searchResults = useSelector((state: RootState) => state.search.results);
    const userService = ServiceFactory.getUserService();
    const tweetService = ServiceFactory.getTweetService();



    useEffect(() => {
        if (searchQuery.length > 0) {
            const fetchResults = async () => {
                const users = await userService.searchUsersWithLimit(searchQuery,LIMIT);
                const tweets = await tweetService.searchTweetsWithLimit(searchQuery,LIMIT);

                // Transform users and tweets to DataItem format with explicit types
                const userResults: DataItem[] = users.map((user: User) => ({
                    id: user.id,
                    title: user.username,
                    category: 'user',
                    // other properties as needed
                }));

                const tweetResults: DataItem[] = tweets.map((tweet: Tweet) => ({
                    id: tweet.id,
                    title: tweet.content,
                    category: 'tweet',
                    // other properties as needed
                }));

                dispatch(setSearchResults([...userResults, ...tweetResults]));
            };
            fetchResults();
        } else {
            dispatch(setSearchResults([]));
        }
    }, [searchQuery, dispatch]);

    const updateSearchQuery = async (query: string, callback?: () => void) => {
        await dispatch(setSearchQuery(query));
        if (callback) {
            callback();
        }
    };

    return { searchQuery, updateSearchQuery, searchResults };
};
