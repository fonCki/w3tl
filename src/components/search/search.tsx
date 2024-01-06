import React, { useState } from 'react';
import { DataItem } from '@models/dataItem';
import { SearchBar } from '../search/search-bar';
import { SearchResults } from './SearchResults';

// Assuming this is the data you want to search through
import tweetAndUserData from '../../../src/mocks/mockTweetAndUserData.json';

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<DataItem[]>([]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setFilteredResults(query.length > 0 ?
            tweetAndUserData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
            : []);
    };

    const handleItemClick = (item: DataItem) => {
        setSearchQuery(item.title); // Set the clicked item's title as the search query
        setFilteredResults([]); // Optionally clear results or keep them
    };

    return (
        <div className="relative">
            <SearchBar onSearch={handleSearch} value={searchQuery} />
            <SearchResults results={filteredResults} onItemClick={handleItemClick} />
        </div>
    );
};

export default Search;

