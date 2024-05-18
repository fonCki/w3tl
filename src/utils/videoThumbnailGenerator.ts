/**
 * Returns the URL of the thumbnail image for a YouTube video.
 *
 * @param {string} url - The URL of the YouTube video.
 * @return {string | null} The URL of the thumbnail image, or null if the input is not a valid YouTube video URL.
 */
function getYouTubeThumbnail(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        const videoId = match[2];
        return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }

    return null;
}
