import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setActiveTab, setCompactMode, setVisible, toggleCreatePostModal } from '@store/slices/menuSlice';
import { handleToggleWithDelay } from '@utils/menuToggle';
import { menuItems, RouteItem } from '@constants/routesConfig';
import { PostButton } from '@components/ui/buttons/PostButton';
import { useLocation } from 'react-router-dom';
import { useNavigationActions } from '@hooks/useNavigationActions';
import { FaPencilAlt } from 'react-icons/fa';


/**
 * Represents a SideBar component in a React application.
 *
 * @component
 * @example
 * // Usage
 * <SideBar />
 */
const SideBar: React.FC = () => {
    const { pathname } = useLocation();

    const { isCompactMode, isVisible, activeTab } = useSelector((state: RootState) => state.menu);
    const dispatch = useDispatch();
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const { navigateToRoute } = useNavigationActions();


    const handleMenuItemClick = (tabName: string) => {
        dispatch(setActiveTab(tabName));
        navigateToRoute(tabName);
    };

    const updateMenuState = () => {
        const screenWidth = window.innerWidth;
        setIsLargeScreen(screenWidth > 1400);

        if (screenWidth < 640) {
            dispatch(setCompactMode(true));
            dispatch(setVisible(false));
            handleToggleWithDelay(dispatch);
        } else if (screenWidth >= 640 && screenWidth < 1024) {
            dispatch(setCompactMode(true));
            dispatch(setVisible(true));
        } else {
            dispatch(setCompactMode(false));
            dispatch(setVisible(true));
        }
    };

    useEffect(() => {
        const currentRoute = menuItems.find(item => pathname.startsWith(item.path));
        dispatch(setActiveTab(currentRoute ? currentRoute.label : ''));
    }, [pathname, dispatch]);

    useEffect(() => {
        updateMenuState();
        window.addEventListener('resize', updateMenuState);
        return () => window.removeEventListener('resize', updateMenuState);
    }, []);

    const transitionClass = isVisible
        ? (isLargeScreen ? 'translate-y-0' : 'translate-x-0')
        : (isLargeScreen ? '-translate-y-full' : '-translate-x-full');

    return (
        <div className={`relative ${isCompactMode ? '' : 'pt-10 '} relative`}>
            <div
                className={`rounded-lg bg-custom-gray bg-opacity-80 text-gray-600 transition-transform duration-300 ease-in-out ${transitionClass} ${isCompactMode ? 'p-0 m-0' : 'px-4 mx-4 pb-22 pr-6'} w-fit h-fit rounded-full`}
            >
                <div className={`${isCompactMode ? 'w-20' : 'w-60'}`}>
                    <ul className={`flex-1 flex flex-col  justify-between  gap-2 ${isCompactMode ? 'p-0 m-0' : 'ml-16'}`}>
                        <div className="flex flex-col gap-2 bg-white bg-opacity-50 shadow-sm rounded-3xl">
                            {menuItems.map((item: RouteItem) => (
                                <li key={item.label}
                                    onClick={() => handleMenuItemClick(item.label)}
                                    className={`flex items-center p-4 m-2 justify-${isCompactMode ? 'center' : 'start'} 
                                    hover:bg-gray-200 rounded-full transition-all duration-300 w-fit cursor-pointer 
                                    ${activeTab === item.label ? 'font-bold text-button-blue' : 'text-gray-600'}
                                   }`}>
                                    <item.icon className="text-xl" />
                                    {!isCompactMode && <span className="ml-2">{item.label}</span>}
                                </li>
                            ))}
                        </div>
                        {!isCompactMode && (<PostButton />)}
                        {isCompactMode && (
                            <li
                                onClick={() => dispatch(toggleCreatePostModal())}
                                className="flex items-center p-4 m-2 justify-center hover:bg-gray-200 rounded-full transition-all duration-300 w-fit cursor-pointer bg-button-blue text-white font-bold hover:bg-blue text-center">
                                <FaPencilAlt className="text-xl" />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;