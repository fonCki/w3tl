import React from 'react';
import TrendingBoard from '@components/Board/TrendingBoard';
import WhoToFollow from '@components/Board/WhoToFollowBoard';

const Right = () => {
    return (
        <div>
            <TrendingBoard />
            <TrendingBoard />
            <WhoToFollow />
        </div>
    );
}

export default Right;
