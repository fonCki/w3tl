import React, { useState } from 'react';
import { Dropdown, List } from 'semantic-ui-react';
import { NotificationLine } from '@components/notifications/Notification-line';
import { Notification } from '@models/notification';
import { HeaderButton } from '@components/buttons/HeaderButton';

const initialNotifications: Notification[] = [
    { id: 1, title: 'New Follow', description: 'John Doe started following you.', read: false, avatar: 'https://i.pravatar.cc/150?img=1', date: new Date('2024-01-04T15:00:00') },
    { id: 2, title: 'New Message', description: 'Jane Smith sent you a message.', read: false, avatar: 'https://i.pravatar.cc/150?img=2', date: new Date('2024-01-01T09:30:00') },
    { id: 3, title: 'Mention in a Post', description: 'Alice Johnson mentioned you in a post.', read: true, avatar: 'https://i.pravatar.cc/150?img=3', date: new Date('2024-01-01T11:45:00') },
    { id: 4, title: 'Comment on Your Post', description: 'Charlie Brown commented on your post: "Great photo!"', read: false, avatar: 'https://i.pravatar.cc/150?img=4', date: new Date('2024-01-01T13:00:00') },
    { id: 5, title: 'Like on Your Photo', description: 'Emily Davis liked your photo.', read: false, avatar: 'https://i.pravatar.cc/150?img=5', date: new Date('2024-01-01T14:15:00') },
    { id: 6, title: 'Event Reminder', description: 'Reminder: Webinar starts at 6 PM today.', read: true, avatar: 'https://i.pravatar.cc/150?img=6', date: new Date('2024-01-01T16:00:00') },
    { id: 7, title: 'New Follower', description: 'Hannah Lee started following you.', read: false, avatar: 'https://i.pravatar.cc/150?img=7', date: new Date('2024-01-01T18:30:00') },
    { id: 8, title: 'Friend Request', description: 'Igor Kuznetsov sent you a friend request.', read: false, avatar: 'https://i.pravatar.cc/150?img=8', date: new Date('2024-01-01T19:00:00') },
    { id: 9, title: 'Birthday Reminder', description: 'Today is Sarah Miller\'s birthday.', read: false, avatar: 'https://i.pravatar.cc/150?img=9', date: new Date('2024-01-01T20:30:00') },
    { id: 10, title: 'New Reaction', description: 'Gary Young reacted to your status.', read: true, avatar: 'https://i.pravatar.cc/150?img=10', date: new Date('2024-01-01T21:15:00') },
    { id: 11, title: 'Group Invitation', description: 'You have been invited to join "Book Lovers".', read: false, avatar: 'https://i.pravatar.cc/150?img=11', date: new Date('2024-01-01T22:00:00') },
    { id: 12, title: 'Live Event', description: 'Nina Morris is going live.', read: false, avatar: 'https://i.pravatar.cc/150?img=12', date: new Date('2024-01-02T08:30:00') },
    { id: 13, title: 'New Article', description: 'Check out this new article: "Tech Trends in 2024".', read: true, avatar: 'https://i.pravatar.cc/150?img=13', date: new Date('2024-01-02T09:45:00') },
    { id: 14, title: 'Survey Request', description: 'We value your feedback! Please take a moment to complete our survey.', read: false, avatar: 'https://i.pravatar.cc/150?img=14', date: new Date('2024-01-02T11:00:00') },
    { id: 15, title: 'Feature Update', description: 'New features have been added to our app!', read: false, avatar: 'https://i.pravatar.cc/150?img=15', date: new Date('2024-01-02T12:15:00') },
    { id: 16, title: 'Account Alert', description: 'Unusual activity detected on your account.', read: true, avatar: 'https://i.pravatar.cc/150?img=16', date: new Date('2024-01-02T14:00:00') },
    { id: 17, title: 'New Comment', description: 'Lisa Turner commented on your post.', read: false, avatar: 'https://i.pravatar.cc/150?img=17', date: new Date('2024-01-03T08:30:00') },
    { id: 18, title: 'Profile Visit', description: 'Someone viewed your profile.', read: true, avatar: 'https://i.pravatar.cc/150?img=18', date: new Date('2024-01-03T09:00:00') },
    { id: 19, title: 'New Tag', description: 'You were tagged in a photo by Olivia Green.', read: false, avatar: 'https://i.pravatar.cc/150?img=19', date: new Date('2024-01-03T10:45:00') },
    { id: 20, title: 'Shared Your Post', description: 'Frank Ellis shared your post.', read: false, avatar: 'https://i.pravatar.cc/150?img=20', date: new Date('2024-01-03T11:30:00') },
];




const NotificationsDropdown: React.FC = () => {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleNotificationClick = (id: number) => {
        console.log('Notification clicked:', id);
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Dropdown
            trigger={
                <HeaderButton iconName="bell" onClick={() => console.log('Bell icon clicked')}>
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{unreadCount}</span>
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
                    <List relaxed divided>
                        {notifications.map(notification => (
                            <NotificationLine
                                key={notification.id}
                                notification={notification}
                                onNotificationClick={() => handleNotificationClick(notification.id)}
                            />
                        ))}
                    </List>
                </div>
            </Dropdown.Menu>
        </Dropdown>
);
};

export default NotificationsDropdown;
