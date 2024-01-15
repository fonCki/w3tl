import React from 'react';
import TrendingBoard from '@components/board/TrendingBoard';
import WhoToFollow from '@components/board/WhoToFollowBoard';
import StickyWrapper from '@components/tools/StickyWrapper';

const Right = () => {
    return (
        <div>
            {/*<StickyWrapper mode={'Stacked'} topOffset={80} bottomOffset={20}>*/}
            <TrendingBoard />
            {/*</StickyWrapper>*/}
            <StickyWrapper mode={'Stacked'} topOffset={80} bottomOffset={20}>
            <WhoToFollow />
            </StickyWrapper>
        </div>
    );
}

export default Right;
