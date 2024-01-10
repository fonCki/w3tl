export interface Notification {
    id: number;
    user: number;
    title: string;
    description: string;
    read: boolean;
    avatar: String;
    date: Date;
}