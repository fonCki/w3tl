import { Notification } from '@models/notification';

export const starterNotification: Notification[] = [
    {
        id: '1',
        user: '',  // Using the user's UID
        title: 'Welcome!',
        description: 'Create your first post!!!',
        read: false,
        avatar: 'https://www.shareicon.net/data/128x128/2016/08/24/819522_orientation_512x512.png',
        date: new Date(),
        navigation: '/home',
    },
    {
        id: '2',
        user: '',  // Using the user's UID
        title: 'Follow-up',
        description: 'Start following other users!!!',
        read: false,
        avatar: 'https://cdn-icons-png.flaticon.com/512/9485/9485846.png',
        date: new Date(),
        navigation: '/lists',
    },
];