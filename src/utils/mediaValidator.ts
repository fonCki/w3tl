// utils/mediaValidator.ts

// Validates image URLs
export const validateImageUrl = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

// Validates video URLs
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
