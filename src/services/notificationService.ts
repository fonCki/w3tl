import notificationsMock from '@data/notificationMockData.json';

export const notificationService = {
    getNotificationsByUserId(userId: number) {
        // Assuming each notification is tied to a user ID in your mock data
        return notificationsMock.filter(notification => notification.user === userId);
    },

    getNotificationById(notificationId: number) {
        return notificationsMock.find(notification => notification.id === notificationId);
    }
};
