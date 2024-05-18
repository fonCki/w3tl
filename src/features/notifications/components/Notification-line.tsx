import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { Notification } from '@models/notification';
import { formatDistanceToNow } from 'date-fns';


/**
 * Represents the props for the NotificationLine component.
 */
interface NotificationLineProps {
    notification: Notification;
    onNotificationClick: () => void;
}

/**
 * Represents a notification line component.
 *
 * @param {Object} notification - The notification object.
 * @param {Function} onNotificationClick - The function to be called when the notification is clicked.
 * @returns {ReactElement} - The rendered notification line component.
 */
export const NotificationLine = ({ notification, onNotificationClick }: NotificationLineProps) => {
    const { title, description, read, avatar, date } = notification;

    // Function to truncate the description to 30 characters
    const truncateDescription = (desc: string) => {
        return desc.length > 35 ? desc.substring(0, 32) + '...' : desc;
    };

    return (
        <div className="flex w-full" onClick={onNotificationClick}>
            <List.Item key={notification.id} className={`cursor-pointer px-4 py-3 min-w-[300px] flex items-center ${!read ? 'bg-gray-100' : 'bg-white'}`}>
            {!read && <div className="h-2 w-2 rounded-full bg-red-600 mr-2"></div>}
            {read && <div className="h-2 w-2 rounded-full bg-transparent-600 mr-2"></div>}
                <Image avatar src={avatar} className="mr-4 " style={{ 'font-size': '24px' }} />
            <div className="flex flex-col flex-grow">
                <List.Header className={`font-medium ${!read ? 'text-gray-900' : 'text-gray-500'}`}>{title}</List.Header>
                <List.Description className="text-sm text-gray-700">{truncateDescription(description)}</List.Description>
                <span className="text-xs text-gray-500 mt-1">{formatDistanceToNow(date, { addSuffix: true })}</span>
            </div>
        </List.Item>
        </div>

    );
};
