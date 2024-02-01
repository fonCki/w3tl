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
import WelcomePage from '@components/pages/WelcomePage';

export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';

export const WELCOME = '/welcome';
export const HOME_MENU_ROUTE = '/home';
export const EXPLORE_MENU_ROUTE = '/explore';
export const LISTS_MENU_ROUTE = '/lists';
export const BOOKMARKS_MENU_ROUTE = '/bookmarks';
export const COMMUNITIES_MENU_ROUTE = '/communities';
export const PROFILE_MENU_ROUTE = '/profile';
export const MORE_MENU_ROUTE = '/more';
export const USER_PROFILE_ROUTE = '/user/:username';
export const POST_ROUTE = '/post/:id';
export const PAGE_NOT_FOUND_ROUTE = '/404.tsx';
export const SEARCH_ROUTE = '/search/:query';

export interface RouteItem {
    path: string;
    component: React.ComponentType;
    label: string;
    icon: IconType;
    isMenuBar?: boolean;
    protected?: boolean;
}

export const routes: RouteItem[] = [
    { path: HOME_ROUTE, component: Home, label: 'home', icon: FaHome, isMenuBar: false, protected: true },
    { path: LOGIN_ROUTE, component: Login, label: 'Login', icon: FaHome, isMenuBar: false, protected: false },
    { path: WELCOME, component: WelcomePage, label: 'Welcome', icon: FaHome, isMenuBar: false, protected: false },
    { path: HOME_MENU_ROUTE, component: Home, label: 'Home', icon: FaHome, isMenuBar: true, protected: true },
    { path: EXPLORE_MENU_ROUTE, component: Explore, label: 'Explore', icon: FaCompass, isMenuBar: true, protected: true },
    { path: LISTS_MENU_ROUTE, component: Lists, label: 'Lists', icon: FaList, isMenuBar: true, protected: true },
    { path: BOOKMARKS_MENU_ROUTE, component: Bookmarks, label: 'Bookmarks', icon: FaBookmark , isMenuBar: true, protected: true },
    { path: COMMUNITIES_MENU_ROUTE, component: Communities, label: 'Communities', icon: FaUsers , isMenuBar: true, protected: true },
    { path: PROFILE_MENU_ROUTE, component: Profile, label: 'Profile', icon: FaUser, isMenuBar: true, protected: true },
    { path: MORE_MENU_ROUTE, component: Home, label: 'More', icon: FaEllipsisH, isMenuBar: true, protected: true },
    { path: USER_PROFILE_ROUTE, component: UserProfile, label: 'User Profile', icon: FaUser, isMenuBar: false, protected: true },
    { path: POST_ROUTE, component: Post, label: 'Post', icon: FaPencilAlt, isMenuBar: false, protected: true },
    { path: PAGE_NOT_FOUND_ROUTE, component: Home, label: 'Page Not Found', icon: TbFaceIdError, isMenuBar: false, protected: true },
    { path: SEARCH_ROUTE, component: Search, label: 'Search', icon: FaSearch, isMenuBar: false, protected: true },
];

export const menuItems: RouteItem[] = routes.filter(route => route.isMenuBar);
