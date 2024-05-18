import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceFactory } from '@services/serviceFactory';

/**
 * Represents the props for the SpecialContent component.
 *
 * @typedef {Object} SpecialContentProps
 * @property {string} content - The content to be displayed.
 * @property {string} [textStyle] - The style of the text. Can be 'italic', 'bold', or 'normal'.
 * @property {number} [textSize] - The size of the text as an integer.
 * @property {boolean} [limitThreeLines] - Indicates whether the content should be limited to three lines.
 * @property {string} [highlightQuery] - The search query to highlight in the content.
 */
interface SpecialContentProps {
    content: string;
    textStyle?: 'italic' | 'bold' | 'normal';
    textSize?: number; // text size as an integer
    limitThreeLines?: boolean; // new prop to control line clamping
    highlightQuery?: string; // New prop for the search query
}

/**
 * Represents a special content component.
 *
 * @param content - The content to be displayed.
 * @param textStyle - The style of the text (normal, italic, or bold).
 * @param textSize - The font size of the text.
 * @param limitThreeLines - Determines whether the content should be limited to three lines.
 * @param highlightQuery - The query to highlight in the content.
 *
 * @returns A React functional component.
 */
const SpecialContent: React.FC<SpecialContentProps> = ({
                                                           content = '',
                                                           textStyle = 'normal',
                                                           textSize = 16,
                                                           limitThreeLines = false,
                                                           highlightQuery = '',
                                                       }) => {
    const MAX_LINES_CONTENT = 2;
    const navigate = useNavigate();
    const userServices = ServiceFactory.getUserService();
    const [userCheck, setUserCheck] = useState<Record<string, boolean>>({});

    const checkUserExists = async (username: string) => {
        if (userCheck[username] !== undefined) return; // Skip if already checked
        const user = await userServices.getUserByUsername(username);
        // setUserCheck(prev => ({ ...prev, [username]: !!user }));
    };

    function handleNavigateToHashtag() {
        return (e: React.MouseEvent<HTMLSpanElement>) => {
            e.preventDefault();
            e.stopPropagation();
            const hashtag = e.currentTarget.innerText.substring(1);
            navigate(`/search/${hashtag}`);
        };
    }

    function handleNavigateToUser() {
        return (e: React.MouseEvent<HTMLSpanElement>) => {
            e.preventDefault();
            e.stopPropagation();
            const username = e.currentTarget.innerText.substring(1);
            navigate(`/user/${username}`);
        };
    }

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

            const spanStyle: React.CSSProperties = { fontSize: textSize };
            if (textStyle === 'italic') spanStyle.fontStyle = 'italic';
            if (textStyle === 'bold') spanStyle.fontWeight = 'bold';

            if (part.startsWith('#')) {
                return <span key={index}
                             style={spanStyle}
                             className="text-blue cursor-pointer hover:underline"
                             onClick={handleNavigateToHashtag()}
                >{part}</span>;
            } else if (part.startsWith('@')) {
                const username = part.substring(1);
                if (userCheck[username] === undefined) {
                    checkUserExists(username); // Trigger check without waiting
                }
                const isUser = userCheck[username];
                if (isUser) {
                    return <span key={index}
                                 style={spanStyle}
                                 className="text-blue cursor-pointer hover:underline"
                                 onClick={handleNavigateToUser()}
                    >{part}</span>;
                } else {
                    return <span key={index} style={spanStyle}>{part}</span>;
                }
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
