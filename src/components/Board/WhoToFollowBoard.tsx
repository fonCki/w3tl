import React from 'react';

interface UserSuggestion {
    name: string;
    username: string;
}

interface WhoToFollowBoardProps {
    suggestions: UserSuggestion[];
    onUserClick: (username: string) => void;
}

// Sample data for user suggestions
const sampleSuggestions: UserSuggestion[] = [
    { name: 'Joe Biden', username: '@JoeBiden' },
    { name: 'ESPN', username: '@espn' },
    { name: 'SportsCenter', username: '@SportsCenter' },
    // ... other suggestions
];

const WhoToFollowBoard: React.FC<WhoToFollowBoardProps> = ({ onUserClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-md space-y-4 p-4">
            <h2 className="text-2xl font-extrabold text-gray-900">Who to follow</h2>
            {sampleSuggestions.map((suggestion, index) => (
                <div key={index} className="pt-2 hover:bg-gray-50 transition duration-150 ease-in-out rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 cursor-pointer" onClick={() => onUserClick(suggestion.username)}>
                                {suggestion.name}
                            </h3>
                            <span className="text-sm text-gray-500">{suggestion.username}</span>
                        </div>
                        <button className="text-blue-600 hover:underline text-sm">Follow</button>
                    </div>
                    {index !== sampleSuggestions.length - 1 && <hr className="my-3"/>}
                </div>
            ))}
            <button className="text-blue-600 hover:underline text-sm font-semibold">Show more</button>
        </div>
    );
};

export default WhoToFollowBoard;
