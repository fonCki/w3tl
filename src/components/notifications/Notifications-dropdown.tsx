import React, { useState, useEffect } from 'react';
import { Dropdown, List } from 'semantic-ui-react';
import { Notification } from '@models/notification';
import { HeaderButton } from '@components/buttons/HeaderButton';
import { notificationService } from '@services/notificationService'; // Import the service

const NotificationsDropdown: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchedNotifications = notificationService.getNotificationsByusername(10      );
        // setNotifications(fetchedNotifications);
    }, []);

    const handleNotificationClick = (id: number) => {
        console.log('Notification clicked:', id);
        // setNotifications(notifications.map(notification =>
        //     // notification.id === id ? { ...notification, read: true } : notification,
        // ));
    };

    const unreadCount = notifications.filter(n => !n.read).length;


    return (
        <Dropdown
            trigger={
                <HeaderButton iconName="bell" onClick={() => console.log('Bell icon clicked')}>
                    {unreadCount > 0 && (
                        <span
                            className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{unreadCount}</span>
                    )}
                </HeaderButton>
            }
            pointing="top right"
            icon={null}
            className="relative"
        >
            <Dropdown.Menu
                className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto"
                style={{ maxHeight: '75vh' }}>
                <div
                    className="sticky top-0 bottom-0 bg-white px-4 py-2 flex justify-between items-center border-b z-10">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    {/*<List relaxed divided>*/}
                    {/*    {notifications.map(notification => (*/}
                    {/*        // <NotificationLine*/}
                    {/*        //     key={notification.id}*/}
                    {/*        //     notification={notification}*/}
                    {/*        //     // onNotificationClick={() => handleNotificationClick(notification.id)}*/}
                    {/*        // />*/}
                    {/*    ))}*/}
                    {/*</List>*/}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationsDropdown;
