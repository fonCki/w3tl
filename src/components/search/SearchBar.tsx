import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    value: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value    }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="ui search" style={{ width: '50vw', maxWidth:'800px' }}>
            <div className="ui icon input" style={{ width: '100%' }}>
                <input
                    className="prompt"
                    type="text"
                    placeholder="Search W3TL"
                    value={value}
                    onChange={(e) => onSearch(e.target.value)}
                />
                <i className="search icon"></i>
            </div>
        </div>
    );
};
