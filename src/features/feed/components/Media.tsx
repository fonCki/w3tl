import React from 'react';

/**
 * Represents the properties of a media element.
 * @interface
 */
interface MediaProps {
    imageUrl?: string;
    videoUrl?: string;
}

/**
 * Component that displays media content.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.imageUrl - The URL of the image to be displayed.
 * @param {string} props.videoUrl - The URL of the video to be displayed.
 * @returns {React.ReactElement|null}
 */
const Media: React.FC<MediaProps> = ({ imageUrl, videoUrl }) => {
    if (imageUrl) {
        return <img src={imageUrl} className="w-full h-72 object-cover rounded-lg overflow-hidden" alt="Tweet Media" />;
    }

    if (videoUrl) {
        const getEmbedVideoUrl = (url: string) => {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
            const match = url.match(regExp);

            if (match && match[2].length === 11) {
                return `https://www.youtube.com/embed/${match[2]}`;
            }
            return null;
        };

        return (
            <div className="w-full h-72 rounded-lg overflow-hidden">
                <iframe
                    title="Tweet Video"
                    src={getEmbedVideoUrl(videoUrl) || ''}
                    className="w-full h-full"
                    allowFullScreen
                />
            </div>
        );
    }

    return null;
};

export default Media;
