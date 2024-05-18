/**
 * Validates if the given image URL is valid by checking if the image can be loaded successfully.
 * @param {string} url - The URL of the image to be validated.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the image can be loaded successfully, or false otherwise.
 */
export const validateImageUrl = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

// Validates video URLs
/**
 * Validates a video URL by sending a HEAD request to check if the URL is valid.
 *
 * @param {string} url - The video URL to validate.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the URL is valid, and false otherwise.
 */
export const validateVideoUrl = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url, {
            method: 'HEAD', // HEAD request to get headers without downloading the entire file
        });
        return response.ok; // true if status code is 2xx
    } catch (error) {
        console.error('Video URL validation error:', error);
        return false;
    }
};
