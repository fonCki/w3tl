import React, { useEffect, useState } from 'react';
import { trendService } from '@services/trendService';
import ReusableCard from '@components/ui/cards/ReusableCard';

/**
 * Represents a trending topic.
 * @interface
 */
interface TrendingTopic {
    category: string;
    topic: string;
    posts: number;
}

/**
 * Represents a trending board component.
 * @component
 */
const TrendingBoard: React.FC = () => {
    const [trends, setTrends] = useState<TrendingTopic[]>([]);

    useEffect(() => {
        const fetchedTrends = trendService.getLastFiveTrends();
        const mappedTrends = fetchedTrends.map(({ category, hashtag, tweetsCount }) => ({
            category: category || 'General', // Default to 'General' if category is undefined
            topic: hashtag,
            posts: parseInt(String(tweetsCount), 10), // Assuming tweetsCount should be a number, parse it
        }));
        setTrends(mappedTrends);
    }, []);

    return (
        <ReusableCard
            title="What’s happening"
            onActionClick={() => { /* Navigate to /trends or handle click */ }}
            onShowMoreClick={() => { /* Implement or hide this button as necessary */ }}
        >
            <div className="space-y-4">
                {trends.map((trend, index) => (
                    <div key={index} className="pt-2 hover:bg-gray-50 transition duration-150 ease-in-out rounded-lg">
                        <div className="text-sm text-gray-500">{trend.category} · Trending</div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                                #{trend.topic}
                            </h3>
                            <span className="text-sm text-gray-400">{trend.posts.toLocaleString()} posts</span>
                        </div>
                    </div>
                ))}
            </div>
        </ReusableCard>
    );
};

export default TrendingBoard;
