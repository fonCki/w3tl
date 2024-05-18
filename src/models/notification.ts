/**
 * Represents a notification.
 *
 * @interface
 */
export interface Notification {
    id: string;
    user: string;
    title: string;
    description: string;
    read: boolean;
    avatar: string;
    date: Date;
    navigation?: string;
}