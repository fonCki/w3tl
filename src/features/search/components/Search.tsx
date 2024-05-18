import React from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { useSearch } from '@hooks/useSearch';
import { DataItem } from '@models/dataItem';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setShowResults } from '@store/slices/searchSlice';

/**
 * React functional component for a search feature.
 *
 * @returns {React.FC} A React functional component.
 */
const Search: React.FC = () => {
    const { searchQuery, updateSearchQuery, searchResults } = useSearch();
    const dispatch = useDispatch();
    const showResults = useSelector((state: RootState) => state.search.showResults);
    const navigate = useNavigate();

    const handleItemClick = (item: DataItem) => {
        updateSearchQuery(item.title);
        dispatch(setShowResults(false));
        navigate(`/search/${item.title}`);
    };

    const handleSearch = (newQuery: string) => {
        if (newQuery) {
            console.log(newQuery + " query");
            navigate(`/search/${newQuery}`);
            dispatch(setShowResults(false));
        } else {
            dispatch(setShowResults(true));
        }
    };


    return (
        <div className="relative">
            <SearchBar onSearch={handleSearch} />
            {showResults && <SearchResults onItemClick={handleItemClick} />}
        </div>
    );
};

export default Search;
