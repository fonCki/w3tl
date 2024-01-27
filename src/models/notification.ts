export interface Notification {
    id: string;
    user: number;
    title: string;
    description: string;
    read: boolean;
    avatar: String;
    date: Date;
}