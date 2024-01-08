import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import { DataItem } from '@models/dataItem';

interface SearchResultsProps {
    results: DataItem[];
    onItemClick: (item: DataItem) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onItemClick }) => {
    if (results.length === 0) return null;

    return (
        <div className="absolute w-full z-10 bg-white shadow-2xl max-h-60 overflow-y-auto mt-1 rounded-md p-2 m-2">
            <List divided relaxed>
                {results.map((result) => (
                    <List.Item key={result.id} className="px-6 py-3 hover:bg-gray-100 cursor-default flex items-center justify-center" onClick={() => onItemClick(result)}>
                        <Icon name="search" className="mr-3 text-gray-500 middle aligned"/>
                        <List.Content>
                            <List.Header className="font-medium">{result.title}</List.Header>
                            <List.Description className="text-sm text-gray-600">{result.category}</List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
    );
};
