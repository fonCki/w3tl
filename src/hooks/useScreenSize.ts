import { useState, useEffect } from 'react';

// Define breakpoints
const screenSizes = {
    mobile: 640, //
    tablet: 768, //
    laptop: 1024, //
    desktop: 1280, //
};

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: false,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenSize({
                isMobile: width < screenSizes.tablet,
                isTablet: width >= screenSizes.tablet && width < screenSizes.laptop,
                isLaptop: width >= screenSizes.laptop && width < screenSizes.desktop,
                isDesktop: width >= screenSizes.desktop,
            });
        };

        // Call once initially and then on every window resize
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenSize;
};
