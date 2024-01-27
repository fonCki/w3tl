export interface User {
    id: string;
    verified?: boolean;
    username: string;
    avatar?: string;
    email: string;
    name: string;
    lastname?: string;
    createdAt: Date;
}