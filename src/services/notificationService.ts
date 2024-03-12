import { Notification } from '@models/notification'; // Adjust the import path as necessary

const notificationsMock: Notification[] = [
    // Add mock data according to your needs. Example:
    {
        id: '1',
        user: 1, // assuming this matches a numeric user ID
        title: 'New Message',
        description: 'You have received a new message',
        read: false,
        avatar: 'path_to_avatar_image',
        date: new Date('2024-03-15T09:00:00Z'),
    },
    {
        id: '2',
        user: 2, // assuming this matches a different numeric user ID
        title: 'Welcome!',
        description: 'Welcome to our service!',
        read: false,
        avatar: 'path_to_another_avatar_image',
        date: new Date('2024-03-16T09:00:00Z'),
    },
    // Add more as needed
];

export const notificationService = {
    getNotificationsByUserId(userId: number) { // Changed from username for clarity, kept as number
        return notificationsMock.filter(notification => notification.user === userId);
    },

    getNotificationById(notificationId: string) { // Assuming ID should be a string as per your model
        return notificationsMock.find(notification => notification.id === notificationId);
    }
};
