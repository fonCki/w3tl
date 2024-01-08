import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import HeaderDropdown from '@components/HeaderDropdown';
import NotificationsDropdown from '@components/notifications/Notifications-dropdown';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import { HeaderButton } from '@components/buttons/HeaderButton';
import Search from '@components/search/search';
import { Logo } from '@components/logo-header';
import MessageDropdown from '@components/messages/MessageDropdown';


interface HeaderProps {
    toggleSidebar: () => void;
}
export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="bg-white  p-5 w-full flex justify-between items-center shadow-amber-100 h-16 fixed top-0 left-0 right-0 z-10">
            <div className="flex items-center gap-2 md:gap-5">
                <HeaderButton iconName="sidebar" onClick={toggleSidebar} />
                <Logo />
            </div>
            {/* Search Bar */}
            <Search />
            {/* Navigation Menu */}
            <NavigationMenu.Root>
                <NavigationMenu.List className="flex items-center gap-2 md:gap-5">
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
        </header>
    );
};

export default Header;
