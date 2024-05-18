import { Notification } from '@models/notification'; // Adjust the import path as necessary

/**
 * List of notification objects.
 *
 * @typedef {Object} Notification
 * @property {string} id - The unique identifier of the notification.
 * @property {string} user - The unique identifier of the user.
 * @property {string} title - The title of the notification.
 * @property {string} description - The description of the notification.
 * @property {boolean} read - Specifies whether the notification has been read or not.
 * @property {string} avatar - The URL of the avatar image for the notification.
 * @property {Date} date - The date and time when the notification was created.
 * @property {string} navigation - The URL or the path to navigate when the notification is clicked.
 */
const notificationsMock: Notification[] = [
    // Add mock data according to your needs. Example:
    {
        id: '1',
        user: '0',
        title: 'Welcome!',
        description: 'Create your first post!!!',
        read: false,
        avatar: 'https://www.shareicon.net/data/128x128/2016/08/24/819522_orientation_512x512.png',
        //date now with the format 2024-03-16T09:00:00Z
        date: new Date(Date.now()),
        navigation: '/home',
    },
    {
        id: '2',
        user: '0',
        title: 'Follow-up',
        description: 'Start following other users!!!',
        read: false,
        avatar: 'https://cdn-icons-png.flaticon.com/512/9485/9485846.png',
        date: new Date(Date.now()),
        navigation: '/lists',
    },
    // Add more as needed
];

/**
 * Notification service for retrieving notifications
 * @namespace notificationService
 */
export const notificationService = {
    getNotificationsByUserId(userId: string) { // Changed from username for clarity, kept as number
        return notificationsMock.filter(notification => notification.user === userId);
    },

    getNotificationById(notificationId: string) { // Assuming ID should be a string as per your model
        return notificationsMock.find(notification => notification.id === notificationId);
    },

    getStarterNotifications() {
        return notificationsMock;
    }
};
