import React from 'react';

interface SpecialContentProps {
    content: string;
    textStyle?: 'italic' | 'bold' | 'normal';
    textSize?: number; // text size as an integer
    limitThreeLines?: boolean; // new prop to control line clamping
    highlightQuery?: string; // New prop for the search query
}

const SpecialContent: React.FC<SpecialContentProps> = ({
                                                           content = '',
                                                           textStyle = 'normal',
                                                           textSize = 16,
                                                           limitThreeLines = false,
                                                           highlightQuery = ''
                                                       }) => {

    const MAX_LINES_CONTENT = 2;
    const parseContent = (text: string) => {
        if (!text) return null;

        const regexp = /(\s|^)([#@]\w+)/g;
        return text.split(regexp).map((part, index) => {
            // Split the part into segments based on the highlightQuery
            if (highlightQuery) {
                const queryIndex = part.toLowerCase().indexOf(highlightQuery.toLowerCase());
                if (queryIndex !== -1) {
                    return (
                        <>
                            {part.substring(0, queryIndex)}
                            <span key={index} style={{ fontWeight: 'bold' }}>
                                {part.substring(queryIndex, queryIndex + highlightQuery.length)}
                            </span>
                            {part.substring(queryIndex + highlightQuery.length)}
                        </>
                    );
                }
            }

            let spanStyle: React.CSSProperties = { fontSize: textSize };
            if (textStyle === 'italic') spanStyle.fontStyle = 'italic';
            if (textStyle === 'bold') spanStyle.fontWeight = 'bold';

            if (part.startsWith('#')) {
                return <span key={index} style={spanStyle} className="text-blue cursor-pointer hover:underline">{part}</span>;
            } else if (part.startsWith('@')) {
                return <span key={index} style={spanStyle} className="text-blue cursor-pointer hover:underline">{part}</span>;
            }
            return <span key={index} style={spanStyle}>{part}</span>;
        });
    };

    const baseStyle: React.CSSProperties = { fontSize: `${textSize}px`, fontStyle: textStyle };
    if (limitThreeLines) {
        baseStyle.display = '-webkit-box';
        baseStyle.WebkitBoxOrient = 'vertical';
        baseStyle.WebkitLineClamp = MAX_LINES_CONTENT;
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
