import { useState, useEffect } from 'react';

// Define breakpoints
/**
 * Represents screen sizes.
 *
 * @typedef {Object} ScreenSizes
 * @property {number} mobile - The width of the mobile screen size.
 * @property {number} tablet - The width of the tablet screen size.
 * @property {number} laptop - The width of the laptop screen size.
 * @property {number} desktop - The width of the desktop screen size.
 */
const screenSizes = {
    mobile: 640, //
    tablet: 768, //
    laptop: 1024, //
    desktop: 1280, //
};

/**
 * Calculates and returns the current screen size based on the window width.
 *
 * @returns {object} The current screen size object.
 * @property {boolean} isMobile - Indicates if the current screen size is considered as mobile.
 * @property {boolean} isTablet - Indicates if the current screen size is considered as tablet.
 * @property {boolean} isLaptop - Indicates if the current screen size is considered as laptop.
 * @property {boolean} isDesktop - Indicates if the current screen size is considered as desktop.
 */
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
