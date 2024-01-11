import React from 'react';
import TrendingBoard from '@components/board/TrendingBoard';
import WhoToFollow from '@components/board/WhoToFollowBoard';

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
