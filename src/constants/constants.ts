import { IconType } from 'react-icons';

export const DEFAULT_BACKGROUND_IMAGE: string = "https://source.unsplash.com/random/800x600";
export const MAX_TWEET_LENGTH: number = 145;
export const MAX_COMMENT_LENGTH: number = 145;

export const getDefaultAvatarImage = (username: string): string => {
    // Using a placeholder service
    return `https://robohash.org/${encodeURIComponent(username)}.png?set=set1&size=150x150`;
};

import {
    FaHome,
    FaCompass,
    FaList,
    FaBookmark,
    FaUsers,
    FaPlus,
    FaUser,
    FaEllipsisH,
    FaPencilAlt,
} from 'react-icons/fa';


export interface MenuItem {
    label: string;
    path: string;
    icon: IconType;
    isPostButton?: boolean;
}

export const menuItems: MenuItem[] = [
    { label: 'Home', path: '/home', icon: FaHome },
    { label: 'Explore', path: '/explore', icon: FaCompass },
    { label: 'Lists', path: '/lists', icon: FaList },
    { label: 'Bookmarks', path: '/bookmarks', icon: FaBookmark },
    { label: 'Communities', path: '/communities', icon: FaUsers },
    { label: 'Profile', path: '/profile', icon: FaUser },
    { label: 'More', path: '/more', icon: FaEllipsisH },
];

export const TOGGLE_DELAY_SECONDS = 5;  // Amount of seconds for the delay




