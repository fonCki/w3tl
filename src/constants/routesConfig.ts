// routesConfig.ts
import {
    FaHome,
    FaCompass,
    FaList,
    FaBookmark,
    FaUsers,
    FaEllipsisH,
    FaUser,
    FaPencilAlt,
    FaSearch,
} from 'react-icons/fa';
import Home from '@components/pages/Home';
import UserProfile from '@components/pages/UserProfile';
import Post from '@components/pages/Post';
import { IconType } from 'react-icons';
import Explore from '@components/pages/Explore';
import Lists from '@components/pages/Lists';
import Bookmarks from '@components/pages/Bookmarks';
import Communities from '@components/pages/Communities';
import Profile from '@components/pages/Profile';
import Search from '@components/pages/Search';
import { TbFaceIdError } from 'react-icons/tb';
import Login from '@components/pages/Login';
// Import other components as needed

export interface RouteItem {
    path: string;
    component: React.ComponentType;
    label: string;
    icon: IconType;
    isMenuBar?: boolean;
    protected?: boolean;

}

export const routes: RouteItem[] = [
    { path: '/', component: Home, label: 'home', icon: FaHome, isMenuBar: false, protected: true },
    { path: '/login', component: Login, label: 'Login', icon: FaHome, isMenuBar: false, protected: false },
    { path: '/home', component: Home, label: 'Home', icon: FaHome, isMenuBar: true, protected: true },
    { path: '/explore', component: Explore, label: 'Explore', icon: FaCompass, isMenuBar: true, protected: true },
    { path: '/lists', component: Lists, label: 'Lists', icon: FaList, isMenuBar: true, protected: true },
    { path: '/bookmarks', component: Bookmarks, label: 'Bookmarks', icon: FaBookmark , isMenuBar: true, protected: true },
    { path: '/communities', component: Communities, label: 'Communities', icon: FaUsers , isMenuBar: true, protected: true },
    { path: '/profile', component: Profile, label: 'Profile', icon: FaUser, isMenuBar: true, protected: true },
    { path: '/more', component: Home, label: 'More', icon: FaEllipsisH, isMenuBar: true, protected: true },
    { path: '/user/:username', component: UserProfile, label: 'User Profile', icon: FaUser, isMenuBar: false, protected: true },
    { path: '/post/:id', component: Post, label: 'Post', icon: FaPencilAlt, isMenuBar: false, protected: true },
    //TODO: Add 404 page
    { path: '/404', component: Home, label: 'Page Not Found', icon: TbFaceIdError, isMenuBar: false, protected: true },
    { path: '/search/:query', component: Search, label: 'Search', icon: FaSearch, isMenuBar: false, protected: true },
];

export const menuItems: RouteItem[] = routes.filter(route => route.isMenuBar);



