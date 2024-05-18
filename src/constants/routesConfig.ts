// routesConfig.ts
import {
    FaBookmark,
    FaCalendar,
    FaCompass,
    FaEllipsisH,
    FaHome,
    FaList,
    FaPencilAlt,
    FaSearch,
    FaUser,
    FaUsers,
} from 'react-icons/fa';

import { TbFaceIdError } from 'react-icons/tb';
import Home from '@pages/Home';
import Login from '@features/auth/components/Login';
import WelcomePage from '@features/auth/components/WelcomePage';
import Lists from '@pages/Lists';
import Bookmarks from '@pages/Bookmarks';
import Explore from '@pages/Explore';
import Communities from '@pages/Communities';
import Profile from '@pages/Profile';
import Follow from '@pages/Follow';
import UserProfile from '@pages/UserProfile';
import Post from '@pages/Post';
import Search from '@pages/Search';
import { IconType } from 'react-icons';


/**
 * The constant variable representing the home route.
 *
 * @constant
 * @type {string}
 * @name HOME_ROUTE
 * @description This variable represents the home route of the application.
 *              It is set to the root path '/'.
 */
export const HOME_ROUTE = '/';
/**
 * The route for the login page.
 *
 * @type {string}
 */
export const LOGIN_ROUTE = '/login';
/**
 * @description The URL path for the welcome page.
 * @constant {string} WELCOME
 */
export const WELCOME = '/welcome';
/**
 * The string representing the route for the home menu.
 *
 * @constant
 * @type {string}
 * @default '/home'
 */
export const HOME_MENU_ROUTE = '/home';
/**
 * The route for the explore menu.
 *
 * @type {string}
 */
export const EXPLORE_MENU_ROUTE = '/explore';
/**
 * The route for the lists menu.
 *
 * @type {string}
 * @const
 */
export const LISTS_MENU_ROUTE = '/lists';
/**
 * Represents the route for the bookmarks menu page.
 * @type {string}
 * @constant
 */
export const BOOKMARKS_MENU_ROUTE = '/bookmarks';
/**
 * The route for the communities menu.
 *
 * @type {string}
 * @constant
 */
export const COMMUNITIES_MENU_ROUTE = '/communities';
/**
 * The route for the profile menu page.
 *
 * @constant {string}
 * @default '/profile'
 * @readonly
 */
export const PROFILE_MENU_ROUTE = '/profile';
/**
 * Represents the path for retrieving a user's followers on a profile.
 *
 * @constant {string} PROFILE_FOLLOWERS
 */
export const PROFILE_FOLLOWERS = '/profile/followers';
/**
 * The route for the 'more' menu.
 *
 * @type {string}
 * @since 1.0.0
 */
export const MORE_MENU_ROUTE = '/more';
/**
 * Represents the user profile route.
 *
 * The user profile route defines the URL pattern for accessing a user's profile based on their username.
 *
 * @constant {string}
 */
export const USER_PROFILE_ROUTE = '/user/:username';
/**
 * Represents the route for creating or updating a specific post.
 *
 * @constant {string}
 * @default '/post/:postId'
 * @example
 * // Usage
 * const route = POST_ROUTE;
 */
export const POST_ROUTE = '/post/:postId';
/**
 * The URL route for the page not found (404) error.
 *
 * @constant
 * @type {string}
 */
export const PAGE_NOT_FOUND_ROUTE = '/404.tsx';
/**
 * @description The variable representing the search route with a query parameter.
 * @constant {string}
 */
export const SEARCH_ROUTE = '/search/:query';

/**
 * Represents a route item for the application.
 * @interface
 */
export interface RouteItem {
    path: string;
    component: React.ComponentType;
    label: string;
    icon: IconType;
    isMenuBar?: boolean;
    protected?: boolean;
}

/**
 * @description Represents an array of route items.
 * @typedef {Array} RouteItem[]
 * @property {string} path - The path for the route.
 * @property {React.Component} component - The component to render for the route.
 * @property {string} label - The label for the route.
 * @property {React.Component} icon - The icon for the route.
 * @property {boolean} isMenuBar - Indicates whether the route should be displayed in the menu bar.
 * @property {boolean} protected - Indicates whether the route requires authentication.
 */
export const routes: RouteItem[] = [
    { path: HOME_ROUTE, component: Home, label: 'home', icon: FaHome, isMenuBar: false, protected: true },
    { path: LOGIN_ROUTE, component: Login, label: 'Login', icon: FaHome, isMenuBar: false, protected: false },
    { path: WELCOME, component: WelcomePage, label: 'Welcome', icon: FaHome, isMenuBar: false, protected: false },
    { path: HOME_MENU_ROUTE, component: Home, label: 'Home', icon: FaHome, isMenuBar: true, protected: true },
    { path: EXPLORE_MENU_ROUTE, component: Explore, label: 'Explore', icon: FaCompass, isMenuBar: true, protected: true },
    { path: LISTS_MENU_ROUTE, component: Lists, label: 'Lists', icon: FaList, isMenuBar: true, protected: true },
    { path: BOOKMARKS_MENU_ROUTE, component: Bookmarks, label: 'Bookmarks', icon: FaBookmark , isMenuBar: true, protected: true },
    { path: COMMUNITIES_MENU_ROUTE, component: Communities, label: 'Events', icon: FaCalendar , isMenuBar: true, protected: true },
    { path: PROFILE_MENU_ROUTE, component: Profile, label: 'Profile', icon: FaUser, isMenuBar: false, protected: true },
    { path: PROFILE_FOLLOWERS, component: Follow, label: 'Followers', icon: FaUsers, isMenuBar: true, protected: true },
    { path: MORE_MENU_ROUTE, component: Home, label: 'More', icon: FaEllipsisH, isMenuBar: true, protected: true },
    { path: USER_PROFILE_ROUTE, component: UserProfile, label: 'User Profile', icon: FaUser, isMenuBar: false, protected: true },
    { path: POST_ROUTE, component: Post, label: 'Post', icon: FaPencilAlt, isMenuBar: false, protected: true },
    { path: PAGE_NOT_FOUND_ROUTE, component: Home, label: 'Page Not Found', icon: TbFaceIdError, isMenuBar: false, protected: true },
    { path: SEARCH_ROUTE, component: Search, label: 'Search', icon: FaSearch, isMenuBar: false, protected: true },
];

/**
 * Represents an array of menu items.
 * Each menu item is an object of type `RouteItem`.
 *
 * @type {RouteItem[]}
 *
 * @typedef {object} RouteItem
 * @property {boolean} isMenuBar - Determines if the route corresponds to a menu bar item.
 */
export const menuItems: RouteItem[] = routes.filter(route => route.isMenuBar);
