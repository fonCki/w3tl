import React from 'react';
import TrendingBoard from '../../../features/boards/TrendingBoard';
import WhoToFollow from '../../../features/boards/WhoToFollowBoard';
import StickyWrapper from '@components/tools/StickyWrapper';

/**
 * Represents the Right component.
 * This component is responsible for rendering the right section of the application.
 * It includes a TrendingBoard and a WhoToFollow component wrapped in StickyWrappers.
 *
 * @returns {JSX.Element} - The rendered component.
 */
const Right = () => {
    return (
        // TODO fix this sticky hack
        <div className="h-[50%]">
            {/*<StickyWrapper mode={'Stacked'} topOffset={80} bottomOffset={20}>*/}
            <TrendingBoard />
            {/*</StickyWrapper>*/}
            <StickyWrapper mode={'Basic'} topOffset={80} bottomOffset={20}>
            <WhoToFollow />
            </StickyWrapper>
        </div>
    );
}

export default Right;
