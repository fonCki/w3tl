import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tweet } from '@models/tweet';

interface ThumbnailProps {
    tweet: Tweet;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ tweet }) => {
    const navigate = useNavigate();

    const navigateToPost = () => {
        navigate(`/post/${tweet.postId}`);
    };

    return (
        <div style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }}>
            <div
                className="thumbnail-container"
                onClick={navigateToPost}
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    border: '1px solid white',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    lineHeight: 0, // to remove any unwanted space below the image
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease-in-out', // Smooth transition for the hover effect
                }}
            >
                <img
                    src={tweet.mediaUrl}
                    alt="Tweet Media"
                    className="object-cover w-full h-full"
                    style={{
                        display: 'block',
                        transition: 'transform 0.3s ease-in-out', // Ensures the image transitions smoothly
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
        </div>
    );
};

export default Thumbnail;
