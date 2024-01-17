// routesConfig.ts
import { FaHome, FaCompass, FaList, FaBookmark, FaUsers, FaEllipsisH, FaUser, FaPencilAlt } from 'react-icons/fa';
import Home from '@components/pages/Home';
import UserProfile from '@components/pages/UserProfile';
import Post from '@components/pages/Post';
import { IconType } from 'react-icons';
import Explore from '@components/pages/Explore';
import Lists from '@components/pages/Lists';
import Bookmarks from '@components/pages/Bookmarks';
// Import other components as needed

export interface RouteItem {
    path: string;
    component: React.ComponentType;
    label: string;
    icon: IconType;
    isMenuBar?: boolean;
}

export const routes: RouteItem[] = [
    { path: '/', component: Home, label: 'Home', icon: FaHome, isMenuBar: false },
    { path: '/home', component: Home, label: 'Home', icon: FaHome, isMenuBar: true },
    { path: '/explore', component: Explore, label: 'Explore', icon: FaCompass, isMenuBar: true },
    { path: '/lists', component: Lists, label: 'Lists.tsx', icon: FaList, isMenuBar: true },
    { path: '/bookmarks', component: Bookmarks, label: 'Bookmarks', icon: FaBookmark , isMenuBar: true },
    { path: '/communities', component: UserProfile, label: 'Communities', icon: FaUsers , isMenuBar: true },
    { path: '/profile', component: Post, label: 'Profile', icon: FaUser, isMenuBar: true },
    { path: '/more', component: Home, label: 'More', icon: FaEllipsisH, isMenuBar: true },
    { path: '/user/:username', component: UserProfile, label: 'User Profile', icon: FaUser, isMenuBar: false },
    { path: '/post/:id', component: Post, label: 'Post', icon: FaPencilAlt, isMenuBar: false },
    //TODO: Add 404 page
    { path: '/404', component: Home, label: 'Page Not Found', icon: FaHome, isMenuBar: false },
];

export const menuItems: RouteItem[] = routes.filter(route => route.isMenuBar);



