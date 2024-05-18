import React, { KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setSearchQuery, setSelectedIndex, setShowResults } from '@store/slices/searchSlice';
import { useSearch } from '@hooks/useSearch';

/**
 * Interface representing the props for the SearchBar component.
 *
 * @interface SearchBarProps
 */
interface SearchBarProps {
    onSearch: (query: string) => void;

}

/**
 * A search bar React component.
 *
 * @component
 * @example
 * // SearchBar.tsx
 * const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
 *     // ... component implementation
 *     return (
 *         <div className="ui search" style={{ width: '50vw', maxWidth: '800px' }}>
 *             <div className="ui icon input" style={{ width: '100%' }}>
 *                 <input
 *                     className="prompt"
 *                     type="text"
 *                     placeholder="Search W3TL"
 *                     value={query}
 *                     onChange={handleInputChange}
 *                     onKeyDown={handleKeyPress}
 *                 />
 *                 <i className="search icon cursor-pointer z-100" onClick={handleSearch}></i>
 *             </div>
 *         </div>
 *     );
 * }
 */
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const { searchQuery, updateSearchQuery, searchResults } = useSearch(); // Use the hook
    const dispatch = useDispatch();
    const query = useSelector((state: RootState) => state.search.query);
    const showResults = useSelector((state: RootState) => state.search.showResults);
    const selectedIndex = useSelector((state: RootState) => state.search.selectedIndex);


    useEffect(() => {
        if (searchResults.length === 0) {
            dispatch(setSelectedIndex(-1)); // Reset selectedIndex if no results
        } else if (selectedIndex >= searchResults.length) {
            dispatch(setSelectedIndex(searchResults.length - 1)); // Adjust if out of bounds
        }
    }, [searchResults.length, selectedIndex, dispatch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!showResults) {
            dispatch(setShowResults(true)); // Show results
        }
        dispatch(setSearchQuery(event.target.value)); // Update Redux state
    };

    const handleSearch = () => {
        const currentQuery = selectedIndex >= 0 ? searchResults[selectedIndex].title : query;
        onSearch(currentQuery);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                if (selectedIndex >= 0) {
                    // Update query with selected item using the hook
                   handleInputChange({ target: { value: searchResults[selectedIndex].title } } as React.ChangeEvent<HTMLInputElement>)
                }
                handleSearch();
                break;
            case 'Escape':
                dispatch(setShowResults(false)); // Hide results
                break;
            case 'ArrowDown':
                const nextIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
                dispatch(setSelectedIndex(nextIndex)); // Select next item, ensure it doesn't go above the number of results
                break;
            case 'ArrowUp':
                const prevIndex = Math.max(0, selectedIndex - 1);
                dispatch(setSelectedIndex(prevIndex)); // Select previous item, ensure it doesn't go below 0
                break;
            default:
                break;
        }
    };


    return (
        <div className="ui search" style={{ width: '50vw', maxWidth: '800px' }}>
            <div className="ui icon input" style={{ width: '100%' }}>
                <input
                    className="prompt"
                    type="text"
                    placeholder="Search W3TL"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <i className="search icon cursor-pointer z-100" onClick={handleSearch}></i>
            </div>
        </div>
    );
};
