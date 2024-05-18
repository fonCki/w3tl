import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Represents the size options for a logo.
 * @typedef { 'tiny' | 'sm' | 'normal' | 'big' | 'xl' } LogoSize
 */
type LogoSize = 'tiny' | 'sm' | 'normal' | 'big' | 'xl';

/**
 * Represents the properties for a Logo component.
 * @typedef {Object} LogoProps
 * @property {LogoSize} [size] - The size of the Logo. Defaults to 'sm'.
 */
type LogoProps = {
    size?: LogoSize; // size is optional, will default to 'sm'
};

/**
 * Logo component that displays the W37L logo.
 *
 * @component
 *
 * @param {object} props - The props object.
 * @param {string} [props.size='sm'] - The size of the logo. Possible values are 'tiny', 'sm', 'normal', 'big', and 'xl'.
 *
 * @returns {ReactElement} The rendered Logo component.
 */
export const Logo: React.FC<LogoProps> = ({ size = 'sm' }) => {
    const navigate = useNavigate();

    // Define size classes
    const sizeClasses = {
        tiny: 'text-2xl leading-[20px]',
        sm: 'text-4xl leading-[28px]', // default size
        normal: 'text-5xl leading-[36px]',
        big: 'text-6xl leading-[44px]',
        xl: 'text-7xl leading-[52px]',
    };

    // Get the appropriate class names based on the size prop
    const sizeClass = sizeClasses[size];

    return (
        <div className="cursor-pointer" onClick={() => navigate(`/home`)}>
            <h1 className={`${sizeClass} font-bold text-yellow`}>
                W<span className="text-cyan-600 ">3</span>7L
            </h1>
        </div>
    );
};
