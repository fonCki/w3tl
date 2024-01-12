import React from 'react';
import  usersMock  from '@data/Json/usersMocktest.json';

interface SpecialContentProps {
    content: string;
}

const SpecialContent: React.FC<SpecialContentProps> = ({ content }) => {
    const parseContent = (text: string) => {
        const regexp = /(\s|^)([#@]\w+)/g;
        return text.split(regexp).map((part, index) => {
            if (part.startsWith('#')) {
                // For hashtags, you can modify the logic as needed
                return <span key={index} className="text-blue cursor-pointer hover:underline">{part}</span>;
            } else if (part.startsWith('@')) {
                // Check if the mentioned user exists
                const username = part.slice(1);
                const isUserExist = usersMock.some(user => user.username === username);

                if (isUserExist) {
                    // Modify this return statement according to your routing or onClick logic
                    return <span
                            key={index} className="text-blue cursor-pointer hover:underline">@{username}</span>;
                } else {
                    return <span key={index} className="text-red-500 cursor-default">@{username}</span>;
                }
            }
            return part;
        });
    };

    return (
        <div>
            {parseContent(content)}
        </div>
    );
};

export default SpecialContent;
