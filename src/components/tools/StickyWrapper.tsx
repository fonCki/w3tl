import React, { ReactNode, useEffect, useState } from 'react';
import { Sticky, StickyContainer } from 'react-sticky';

// Define a type for the Sticky child function argument
/**
 * Represents the properties of a sticky child component.
 *
 * @typedef {Object} StickyChildProps
 * @property {React.CSSProperties} style - The style to apply to the sticky child component.
 * @property {boolean} isSticky - Indicates whether the sticky child component is currently sticky.
 * @property {boolean} wasSticky - Indicates whether the sticky child component was previously sticky.
 * @property {number} distanceFromTop - The distance of the sticky child component from the top of the scrollable container.
 * @property {number} distanceFromBottom - The distance of the sticky child component from the bottom of the scrollable container.
 * @property {number} calculatedHeight - The calculated height of the sticky child component.
 */
type StickyChildProps = {
    style: React.CSSProperties;
    isSticky: boolean;
    wasSticky: boolean;
    distanceFromTop: number;
    distanceFromBottom: number;
    calculatedHeight: number;
};

/**
 * Represents the props for the StickyWrapper component.
 * @typedef {Object} StickyWrapperProps
 * @property {'Basic' | 'Relative' | 'Stacked'} mode - The mode of the StickyWrapper component.
 * @property {ReactNode} children - The children of the StickyWrapper component.
 * @property {number} [topOffset] - The top offset of the StickyWrapper component.
 * @property {number} [bottomOffset] - The bottom offset of the StickyWrapper component.
 */
type StickyWrapperProps = {
    mode: 'Basic' | 'Relative' | 'Stacked';
    children: ReactNode;
    topOffset?: number;
    bottomOffset?: number;
};

/**
 * Represents a sticky wrapper component in React.
 * @typedef {import('react').ReactNode} ReactNode
 * @typedef {import('react').FC} FC
 * @typedef {Object} StickyWrapperProps
 * @property {string} mode - The sticky mode ('Basic', 'Relative', or 'Stacked').
 * @property {ReactNode} children - The child components to be wrapped and made sticky.
 * @property {number} [topOffset=0] - The offset from the top in pixels when the component is sticky.
 * @property {number} [bottomOffset=0] - The offset from the bottom in pixels when the component is sticky.
 */
const StickyWrapper: React.FC<StickyWrapperProps> = ({ mode, children, topOffset = 0, bottomOffset = 0 }) => {
    const [isScreenLargeEnough, setIsScreenLargeEnough] = useState(window.innerHeight > 650);

    const renderStickyContent = ({
                                     style,
                                     isSticky,
                                     wasSticky,
                                     distanceFromTop,
                                     distanceFromBottom,
                                     calculatedHeight,
                                 }: StickyChildProps) => (
        <div style={{ ...style, top: isSticky ? topOffset : 0 }}>
            {children}
            {/* Display additional information for debugging or demonstration */}
            {/* ... */}
        </div>
    );

    useEffect(() => {
        const handleResize = () => {
            setIsScreenLargeEnough(window.innerHeight > 650);
        };

        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Function to render Sticky content
    // ... rest of your component logic

    if (!isScreenLargeEnough) {
        // If the screen height is less than 650px, render children without Sticky
        return <>{children}</>;
    }


    switch (mode) {
        case 'Basic':
            return (
                <StickyContainer style={{ height: '100%' }}>
                <Sticky topOffset={-topOffset} bottomOffset={bottomOffset}>
                        {renderStickyContent}
                    </Sticky>
                </StickyContainer>
            );
        case 'Relative':
            // Sticky within a scrollable container
            return (
                <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                    <StickyContainer>
                        <Sticky topOffset={-topOffset} bottomOffset={bottomOffset} relative>
                            {renderStickyContent}
                        </Sticky>
                    </StickyContainer>
                </div>
            );
        case 'Stacked':
            // Multiple sticky elements stack on top of each other
            // This requires custom logic to handle stacking
            return (
                <StickyContainer>
                    {/* You can place multiple Sticky components here for stacking */}
                    <Sticky topOffset={-topOffset} bottomOffset={bottomOffset}>
                        {renderStickyContent}
                    </Sticky>
                    {/* Additional Sticky components can be added here */}
                </StickyContainer>
            );
        default:
            return <>{children}</>;
    }
};

export default StickyWrapper;
