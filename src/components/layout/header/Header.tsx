import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import HeaderDropdown from '@components/layout/header/HeaderDropdown';
import NotificationsDropdown from '../../../features/notifications/components/Notifications-dropdown';
import { HeaderButton } from '@components/ui/buttons/HeaderButton';
import Search from '../../../features/search/components/Search';
import { Logo } from '@components/ui/icons/logo-header';
import MessageDropdown from '../../../features/messages/components/MessageDropdown';
import { useState } from 'react';
import { toggleVisibility } from '@store/slices/menuSlice';
import { useDispatch } from 'react-redux';
import { handleToggleWithDelay } from '@utils/menuToggle';

/**
 * Header component that displays a navigation menu, search bar, and other related elements.
 * @returns {ReactElement} The rendered Header component.
 */
export const Header = () => {
    const [showSearch, setShowSearch] = useState(true); // State to toggle search bar visibility
    const dispatch = useDispatch();

    const handleToggleCompact = () => {
        dispatch(toggleVisibility());
        handleToggleWithDelay(dispatch);
    };

    return (
        <header className="bg-white p-5 w-full flex justify-center items-center shadow-amber-100 h-16 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-screen-xl w-full flex justify-between items-center px-4 lg:px-0">
                <div className="flex items-center gap-2 md:gap-5">
                    <HeaderButton iconName="sidebar" onClick={handleToggleCompact} />
                    <Logo />
                </div>

                {/* Search.tsx Bar - Hidden on small screens */}
                {showSearch && <div className="hidden sm:block">
                    <Search />
                </div>}

                {/* Navigation Menu */}
                <NavigationMenu.Root>
                    <NavigationMenu.List className="flex items-center gap-2 md:gap-5">
                        <NavigationMenuItem className="relative">
                            {/* Search.tsx Icon - Visible on small screens */}
                            { <div className="sm:hidden">
                                <HeaderButton iconName="search" onClick={() => setShowSearch(!showSearch)} />
                            </div>}
                        </NavigationMenuItem>
                        <NavigationMenuItem className="relative">
                            <MessageDropdown />
                        </NavigationMenuItem>
                        <NavigationMenuItem className="relative">
                            <NotificationsDropdown />
                        </NavigationMenuItem>
                        <NavigationMenuItem className="relative">
                            <HeaderDropdown />
                        </NavigationMenuItem>
                    </NavigationMenu.List>
                </NavigationMenu.Root>
            </div>
        </header>
    );
};

export default Header;
