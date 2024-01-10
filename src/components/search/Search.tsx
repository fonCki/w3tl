import React, { useState, useEffect } from 'react';
import { SearchBar } from '@components/search/SearchBar';
import { SearchResults } from '@components/search/SearchResults';
import { userService } from '@services/userService';
import { tweetService } from '@services/tweetService';
import { DataItem } from '@models/dataItem'; // Make sure this matches your model

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<DataItem[]>([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            const users = userService.getAllUsers().filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
            const tweets = tweetService.getAllTweets().filter(tweet => tweet.content.toLowerCase().includes(searchQuery.toLowerCase()));

            // Combine and map to DataItem format
            const combinedResults: DataItem[] = [
                ...users.map(user => ({
                    id: user.id,
                    title: user.username,
                    category: 'user', // or some relevant category
                    // other properties...
                })),
                ...tweets.map(tweet => ({
                    id: tweet.id,
                    title: tweet.content,
                    category: 'tweet', // or some relevant category
                    // other properties...
                }))
            ];

            setFilteredResults(combinedResults);
        } else {
            setFilteredResults([]);
        }
    }, [searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleItemClick = (item: DataItem) => {
        setSearchQuery(item.title);
        setFilteredResults([]);
    };

    return (
        <div className="relative">
            <SearchBar onSearch={handleSearch} value={searchQuery} />
            <SearchResults results={filteredResults} onItemClick={handleItemClick} />
        </div>
    );
};

export default Search;
