import React, { ReactNode, useEffect, useState } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

// Define a type for the Sticky child function argument
type StickyChildProps = {
    style: React.CSSProperties;
    isSticky: boolean;
    wasSticky: boolean;
    distanceFromTop: number;
    distanceFromBottom: number;
    calculatedHeight: number;
};

type StickyWrapperProps = {
    mode: 'Basic' | 'Relative' | 'Stacked';
    children: ReactNode;
    topOffset?: number;
    bottomOffset?: number;
};

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
