export interface User {
    id: number;
    verified: boolean;
    username: string;
    avatar: string;
    email?: string;
    name?: string;
    lastname?: string;
    createdAt: Date;
}