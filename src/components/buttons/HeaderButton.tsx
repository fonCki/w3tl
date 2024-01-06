import React from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';

interface HeaderButtonProps {
    iconName: SemanticICONS;
    onClick: () => void;
    children?: React.ReactNode;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ iconName, onClick, children }) => {
    return (
        <div
            className="flex items-center justify-center rounded-full h-12 w-12 transition-colors duration-300 hover:bg-black hover:bg-opacity-10 cursor-pointer m-0 pl-1 relative"
            onClick={onClick}
        >
            <Icon name={iconName} size="large" className="text-gray-700" />
            {children}
        </div>
    );
};
