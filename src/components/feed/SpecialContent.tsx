import React from 'react';
import usersMock from '@data/Json/usersMocktest.json';

interface SpecialContentProps {
    content: string;
    textStyle?: 'italic' | 'bold' | 'normal';
    textSize?: number; // text size as an integer
}

const SpecialContent: React.FC<SpecialContentProps> = ({ content, textStyle = 'normal', textSize = 16 }) => {
    const parseContent = (text: string) => {
        const regexp = /(\s|^)([#@]\w+)/g;
        return text.split(regexp).map((part, index) => {
            let spanStyle: React.CSSProperties = {};

            if (textSize) {
                spanStyle.fontSize = textSize;
            }

            if (textStyle === 'italic') {
                spanStyle.fontStyle = 'italic';
            } else if (textStyle === 'bold') {
                spanStyle.fontWeight = 'bold';
            }

            if (part.startsWith('#')) {
                return <span key={index} style={spanStyle} className="text-blue cursor-pointer hover:underline">{part}</span>;
            } else if (part.startsWith('@')) {
                const username = part.slice(1);
                const isUserExist = usersMock.some(user => user.username === username);

                if (isUserExist) {
                    return <span key={index} style={spanStyle} className="text-blue cursor-pointer hover:underline">@{username}</span>;
                } else {
                    return <span key={index} style={spanStyle} className="text-red-500 cursor-default">@{username}</span>;
                }
            }
            return <span key={index} style={spanStyle}>{part}</span>;
        });
    };

    return (
        <div>
            {parseContent(content)}
        </div>
    );
};

export default SpecialContent;
