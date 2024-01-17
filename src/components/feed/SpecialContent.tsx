import React from 'react';

interface SpecialContentProps {
    content: string;
    textStyle?: 'italic' | 'bold' | 'normal';
    textSize?: number; // text size as an integer
    limitThreeLines?: boolean; // new prop to control line clamping

}

const SpecialContent: React.FC<SpecialContentProps> = ({ content = '', textStyle = 'normal', textSize = 16, limitThreeLines = false }) => {
    const parseContent = (text: string) => {
        if (!text) return null; // Check if the text is defined
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
                const isUserExist = true; // TODO: check if user exist
                if (isUserExist) {
                    return <span key={index} style={spanStyle} className="text-blue cursor-pointer hover:underline">@{username}</span>;
                } else {
                    return <span key={index} style={spanStyle} className="text-red-500 cursor-default">@{username}</span>;
                }
            }
            return <span key={index} style={spanStyle}>{part}</span>;
        });
    };

    const baseStyle: React.CSSProperties = {};

    // Apply text size and style
    if (textSize) {
        baseStyle.fontSize = `${textSize}px`;
    }
    if (textStyle === 'italic') {
        baseStyle.fontStyle = 'italic';
    } else if (textStyle === 'bold') {
        baseStyle.fontWeight = 'bold';
    }

    // Apply three-line limit if limitThreeLines is true
    if (limitThreeLines) {
        baseStyle.display = '-webkit-box';
        baseStyle.WebkitBoxOrient = 'vertical';
        baseStyle.WebkitLineClamp = 2;
        baseStyle.overflow = 'hidden';
        baseStyle.textOverflow = 'ellipsis';
    }


    return (
        <div style={baseStyle}>
            {parseContent(content)}
        </div>
    );
};

export default SpecialContent;
