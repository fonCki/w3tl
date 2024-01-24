import React, { useEffect } from 'react';
import FeedTitle from '@components/feed/FeedTitle';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setShowResults } from '@store/slices/searchSlice';
import SearchUsers from '@components/SearchUsers';
import SearchTweets from '@components/SearchTweets';
import { Divider } from 'semantic-ui-react';


const Search = () => {
    const { query } = useParams<{ query: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        // Update the search query in Redux state when component mounts
        if (query) {
            dispatch(setSearchQuery(query));
            dispatch(setShowResults(false)); // Show results

        }
    }, [query, dispatch]);

    return (
        <div>
            <div>
                <FeedTitle title={"Search: " + (query || '')} showUser={false} />
                <Divider />
                {query && <SearchUsers query={query} />}
                {query && <SearchTweets query={query} />}
            </div>
        </div>
    );
};

export default Search;
