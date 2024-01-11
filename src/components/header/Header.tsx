import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import HeaderDropdown from '@components/header/HeaderDropdown';
import NotificationsDropdown from '@components/notifications/Notifications-dropdown';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import { HeaderButton } from '@components/buttons/HeaderButton';
import Search from '@components/search/Search';
import { Logo } from '@components/header/logo-header';
import MessageDropdown from '@components/messages/MessageDropdown';
import { useState } from 'react';
import { Icon } from 'semantic-ui-react';


interface HeaderProps {
    toggleSidebar: () => void;
}
export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const [showSearch, setShowSearch] = useState(true); // State to toggle search bar visibility
    const [showSearchIcon, setShowSearchIcon] = useState(false); // State to toggle search icon visibility

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <header className="bg-white p-5 w-full flex justify-center items-center shadow-amber-100 h-16 fixed top-0 left-0 right-0 z-10">
            <div className="max-w-screen-xl w-full flex justify-between items-center px-4 lg:px-0">
                <div className="flex items-center gap-2 md:gap-5">
                    <HeaderButton iconName="sidebar" onClick={toggleSidebar} />
                    <Logo />
                </div>

                {/* Search Bar - Hidden on small screens */}
                {showSearch && <div className="hidden sm:block">
                    <Search />
                </div>}

                {/* Navigation Menu */}
                <NavigationMenu.Root>
                    <NavigationMenu.List className="flex items-center gap-2 md:gap-5">
                        <NavigationMenuItem className="relative">
                            {/* Search Icon - Visible on small screens */}
                            { <div className="sm:hidden">
                                <HeaderButton iconName="search" onClick={toggleSearch} />
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
