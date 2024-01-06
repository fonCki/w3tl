import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import HeaderDropdown from './HeaderDropdown'
import NotificationsDropdown from './notifications/Notifications-dropdown';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import { MySidebar } from './sideBar/MySidebar';
import { HeaderButton } from './buttons/HeaderButton';

import Search from './search/search';


interface HeaderProps {
    toggleSidebar: () => void;
}
export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="bg-blue p-5 w-full flex justify-between items-center">
            {/* Sidebar Button  and logo*/}
            <HeaderButton iconName="sidebar" onClick={toggleSidebar} />
                <div>
                    <h1 className="text-yellow text-4xl font-bold leading-[28px]">
                        W<span className="text-white">3</span>TL
                    </h1>
                </div>
            {/* Search Component */}
            <Search />

            {/* Navigation Menu */}
            <NavigationMenu.Root>
                <NavigationMenu.List className="flex gap-[30px] items-center justify-between text-xl">
                    <NavigationMenuItem className="relative flex">
                        <NotificationsDropdown />
                    </NavigationMenuItem>
                    <NavigationMenuItem className="relative flex">
                        <HeaderDropdown />
                    </NavigationMenuItem>
                </NavigationMenu.List>
            </NavigationMenu.Root>
        </header>
    );
};

export default Header;
