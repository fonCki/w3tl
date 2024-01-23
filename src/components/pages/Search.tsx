import React, { useEffect } from 'react';
import FeedTitle from '@components/feed/FeedTitle';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@store/slices/searchSlice';

const Search = () => {
    const { query } = useParams<{ query: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        // Update the search query in Redux state when component mounts
        if (query) {
            dispatch(setSearchQuery(query));
        }
    }, [query, dispatch]);

    return (
        <div>
            <FeedTitle title={query} showUser={false} />
        </div>
    );
};

export default Search;
