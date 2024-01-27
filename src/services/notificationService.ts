import notificationsMock from '@data/Json/notificationMockData.json';

export const notificationService = {
    getNotificationsByusername(username: number) {
        // Assuming each notification is tied to a user ID in your mock data
        return notificationsMock.filter(notification => notification.user === username);
    },

    getNotificationById(notificationId: number) {
        return notificationsMock.find(notification => notification.id === notificationId);
    }
};
