import React from 'react';
import { Icon, List } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { DataItem } from '@models/dataItem';

/**
 * Represents the props for SearchResults component.
 *
 * @typedef {Object} SearchResultsProps
 * @property {function} onItemClick - Function to handle item click action.
 * @property {DataItem} onItemClick.item - The item that was clicked.
 */
interface SearchResultsProps {
    onItemClick: (item: DataItem) => void;
}

/**
 * Render a list of search results.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onItemClick - Function called when an item is clicked.
 * @returns {React.Element|null} - The rendered component.
 */
export const SearchResults: React.FC<SearchResultsProps> = ({ onItemClick }) => {
    const searchResults = useSelector((state: RootState) => state.search.results);
    const selectedIndex = useSelector((state: RootState) => state.search.selectedIndex);
    const showResults = useSelector((state: RootState) => state.search.showResults);

    const transitionClasses = 'transition-transform duration-500 ease-in-out';

    if (searchResults.length === 0) {
        return null;
    }

    const handleClick = (item: DataItem) => {
        onItemClick(item);
    };

    return (
        <div
            className={`absolute w-full z-10 bg-white shadow-2xl max-h-60 overflow-y-auto mt-1 rounded-md p-2 m-2 ${showResults ? 'transform translate-y-0' : 'transform -translate-y-full opacity-0'} ${transitionClasses}`}>
            <List divided relaxed>
                {searchResults.map((result, index) => (
                    <List.Item
                        // key={result.id} // Uncomment and ensure this is a unique value
                        className={`px-6 py-3 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${index === selectedIndex ? 'bg-gray-100' : ''}`}
                        onClick={() => handleClick(result)}
                    >
                        <Icon name="search" className="mr-3 text-gray-500 middle aligned" />
                        <List.Content>
                            <List.Header >
                                    {result.title}
                            </List.Header>
                            <List.Description className="text-sm text-gray-600">
                                {result.category}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
    );
};
