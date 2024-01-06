import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import HeaderDropdown from '@components/HeaderDropdown';
import NotificationsDropdown from '@components/notifications/Notifications-dropdown';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import { HeaderButton } from '@components/buttons/HeaderButton';
import Search from '@components/search/search';
import { Logo } from '@components/logo-header';


interface HeaderProps {
    toggleSidebar: () => void;
}
export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="bg-blue p-5 w-full flex justify-between items-center">
            <div className="flex items-center gap-5">
            <HeaderButton iconName="sidebar" onClick={toggleSidebar} />
            <Logo />
            </div>
            {/* Search Bar */}
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
