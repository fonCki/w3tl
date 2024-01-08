import React from 'react';

interface TrendingTopic {
    category: string;
    topic: string;
    posts: number;
}

interface TrendingBoardProps {
    trends: TrendingTopic[];
    onTrendClick: (topic: string) => void;
}

// Sample data for trends
const sampleTrends: TrendingTopic[] = [
    { category: 'Technology', topic: 'CES2024', posts: 48000 },
    { category: 'Sports', topic: 'WorldCup', posts: 36000 },
    { category: 'Entertainment', topic: 'Oscars', posts: 29000 },
    { category: 'Politics', topic: 'Elections', posts: 53000 },
    { category: 'Science', topic: 'MarsLanding', posts: 42000 },

];

const TrendingBoard: React.FC<TrendingBoardProps> = ({ onTrendClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-md space-y-4 p-4"> {/* Adjust padding as needed */}
            <h2 className="text-2xl font-extrabold text-gray-900">What’s happening</h2>
            {sampleTrends.map((trend, index) => (
                <div key={index} className="pt-2 hover:bg-gray-50 transition duration-150 ease-in-out rounded-lg">
                    <div className="text-sm text-gray-500">{trend.category} · Trending</div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer" onClick={() => onTrendClick(trend.topic)}>
                            #{trend.topic}
                        </h3>
                        <span className="text-sm text-gray-400">{trend.posts.toLocaleString()} posts</span>
                    </div>
                    {index !== sampleTrends.length - 1 && <hr className="my-3"/>}
                </div>
            ))}
            <button className="text-blue-600 hover:underline text-sm font-semibold">Show more</button>
        </div>
    );
};

export default TrendingBoard;
