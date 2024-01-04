import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import DropdownExampleSelection from './dropdown';
import NotificationsDropdown from './notifications/notifications-dropdown';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import { DataItem } from '@models/dataItem';
import { Icon } from 'semantic-ui-react';
import { MySidebar } from '../components/mySidebar';

// Mock data for tweets and users
const tweetAndUserData = [
    { category: 'Tweets', title: 'Exploring the Cosmos #space' },
    { category: 'Tweets', title: 'New advancements in AI' },
    { category: 'Tweets', title: 'Discovering hidden talents in coding' },
    { category: 'Users', title: 'JaneDoe123' },
    { category: 'Users', title: 'TechGuru' },
    { category: 'Users', title: 'NaturePhotographer' },
    // ... more data
];

export const Header = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<DataItem[]>([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.length > 0) {
            const filteredData = tweetAndUserData.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()));
            setFilteredResults(filteredData);
        } else {
            setFilteredResults([]);
        }
    };

    return (
        <header className="bg-blue p-5 w-100 flex justify-between items-center">
            {/* Sidebar */}
            <MySidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

            {/* Logo and Sidebar Icon */}
            <div className="flex gap-3 items-center ">
                <div
                    className="inline-flex justify-center items-center rounded-full h-12 w-12 transition-colors duration-300 hover:bg-black hover:bg-opacity-10 cursor-pointer m-0 p-0"
                    onClick={toggleSidebar}
                >
                    <Icon name="sidebar" size={'large'} className="text-gray-700 m-0 p-0" />
                </div>
                <div>
                    <h1 className="text-yellow text-4xl font-bold leading-[28px]">
                        W<span className="text-white">3</span>TL
                    </h1>
                </div>
            </div>

            {/* Search Bar */}
            <div className="ui search" style={{ width: '50vw' }}>
                <div className="ui icon input" style={{ width: '100%' }}>
                    <input className="prompt" type="text" placeholder="Search W3TL"></input>
                    <i className="search icon"></i>
                </div>
                <div className="results"></div>
            </div>


            {/* Navigation Menu */}
            <NavigationMenu.Root>
                <NavigationMenu.List className="flex gap-[30px] items-center justify-between text-xl">
                    <NavigationMenuItem className="relative flex">
                        <NotificationsDropdown />
                    </NavigationMenuItem>
                    <NavigationMenuItem className="relative flex">
                        <DropdownExampleSelection />
                    </NavigationMenuItem>
                </NavigationMenu.List>
            </NavigationMenu.Root>
        </header>
    );
};

export default Header;
