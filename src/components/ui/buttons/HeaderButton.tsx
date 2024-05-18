import React from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';

/**
 * Represents the props for the HeaderButton component.
 */
interface HeaderButtonProps {
    iconName: SemanticICONS;
    onClick: () => void;
    size?: 'small' | 'medium' | 'large'; // Size options
    hoverColor?: 'red' | 'blue' | 'green' | 'yellow' | 'none'; // Hover color options
    isFilled?: boolean; // New prop to determine if the icon is filled or outlined
    children?: React.ReactNode;
}

/**
 * Represents a header button component.
 *
 * @component
 * @param {object} props - The props for the header button.
 * @param {string} props.iconName - The name of the icon.
 * @param {function} props.onClick - The click event handler.
 * @param {string} [props.size='large'] - The size of the button ('small', 'medium', 'large').
 * @param {string} [props.hoverColor='none'] - The hover color of the button ('red', 'blue', 'green', 'yellow', 'none').
 * @param {boolean} [props.isFilled=false] - Whether the button is filled or not.
 * @param {ReactNode} [props.children] - The content within the button.
 * @returns {ReactElement} The rendered header button component.
 */
export const HeaderButton: React.FC<HeaderButtonProps> = ({
                                                              iconName, onClick, size = 'large', hoverColor = 'none', isFilled = false, children
                                                          }) => {
    // Mapping size to Tailwind classes
    const sizeClasses = {
        small: 'h-8 w-8',
        medium: 'h-10 w-10',
        large: 'h-12 w-12',
    };

    // Mapping hover color to Tailwind classes
    const hoverColorClasses = {
        red: 'hover:bg-red-500',
        blue: 'hover:bg-blue-500',
        green: 'hover:bg-green-500',
        yellow: 'hover:bg-yellow-500',
        none: 'hover:bg-black',
    };

    // Mapping filled state to Tailwind text color classes
    const fillColorClasses = isFilled ? `text-${hoverColor}-500` : 'text-gray-700';

    return (
        <div
            className={`flex items-center justify-center rounded-full ${sizeClasses[size]} transition-colors duration-300 ${hoverColorClasses[hoverColor]} hover:bg-opacity-10 cursor-pointer m-0 pl-1 relative`}
            onClick={onClick}
        >
            <Icon name={iconName} size="large" className={fillColorClasses} />
            {children}
        </div>
    );
};
