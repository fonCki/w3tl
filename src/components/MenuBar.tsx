import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaHome, FaCompass, FaList, FaBookmark, FaUsers, FaEllipsisH, FaUser, FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setVisible, setCompactMode, setActiveTab, toggleCreatePostModal } from '@store/slices/menuSlice';
import { handleToggleWithDelay } from '@utils/menuToggle';
import { MenuItem } from '@constants/constants';
import { menuItems } from '@constants/constants';
import { Button } from 'semantic-ui-react';


const MenuBar: React.FC = () => {
    const { isCompactMode, isVisible } = useSelector((state: RootState) => state.menu);
    const dispatch = useDispatch();
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const activeTab = useSelector((state: RootState) => state.menu.activeTab);

    const handleMenuItemClick = (tabName: string) => {
        dispatch(setActiveTab(tabName));
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
        updateMenuState();
        window.addEventListener('resize', updateMenuState);
        return () => window.removeEventListener('resize', updateMenuState);
    }, []);

    // Determine the transition class based on the visibility and screen width


    const transitionClass = isVisible
        ? (isLargeScreen ? 'translate-y-0' : 'translate-x-0')
        : (isLargeScreen ? '-translate-y-full' : '-translate-x-full');

    return (
        <div
            className={`rounded-lg bg-custom-gray bg-opacity-80 text-gray-600 transition-transform duration-300 ease-in-out ${transitionClass} ${isCompactMode ? 'p-0 m-0' : 'px-4 mx-4'} w-fit`}
            style={{ height: 'calc(100vh - 8rem)' }}
        >
            <div className={`${isCompactMode ? 'w-20' : 'w-60'}`}>
                <ul className={`flex-1 flex flex-col bg-white bg-opacity-50 justify-between shadow-md rounded-3xl  gap-2 ${isCompactMode ? 'p-0 m-0' : 'ml-16'}`}>
                    {menuItems.map((item: MenuItem) => (
                        <li key={item.label}
                            className={`flex items-center p-4 m-2 justify-${isCompactMode ? 'center' : 'start'} 
                                    hover:bg-gray-200 rounded-full transition-all duration-300 w-fit cursor-pointer 
                                    ${activeTab === item.label ? 'font-bold text-button-blue' : 'text-gray-600'}
                                    ${item.isPostButton ? 'bg-button-blue text-white font-bold  hover:bg-blue text-center' : ''}`}>
                            <item.icon className="text-xl" />
                            {!isCompactMode && <span className="ml-2">{item.label}</span>}
                        </li>
                    ))}
                    {!isCompactMode && (
                    <Button className="w-full mt-4" color="blue" size="large" style={{ borderRadius: '9999px' }}
                            onClick={() => dispatch(toggleCreatePostModal())}>
                        Post
                    </Button>

                    )}
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
    );
};

export default MenuBar;