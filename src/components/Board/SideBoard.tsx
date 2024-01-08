import React from 'react';
import SmallBoard from '@components/Board/SmallBoard';
import TrendingBoard from '@components/Board/TrendingBoard';
import StickyBox from 'react-sticky-box';
import WhoToFollowBoard from '@components/Board/WhoToFollowBoard';


const mockTrends = [
    { category: 'Technology', topic: 'CES 2024', posts: 36000 },
    { category: 'Sports', topic: 'Manchester United', posts: 34600 },
    // ... more trends
];

const handleTrendClick = (topic: string) => {
    console.log(`Search for: ${topic}`);
    // Implement search or filter logic here
};

const SideBoard: React.FC = () => {
    return (
        <StickyBox offsetTop={20} offsetBottom={20} className="w-full h-screen bg-transparent px-4 py-2">
            <div className="mb-4 mt-4">

            <TrendingBoard trends={mockTrends} onTrendClick={handleTrendClick} />
            </div>
            <div className="mb-4 mt-4">
            <WhoToFollowBoard suggestions={mockTrends} onUserClick={handleTrendClick}   />
            </div>
            {/* Other components */}
        </StickyBox>
    );
};

export default SideBoard;
