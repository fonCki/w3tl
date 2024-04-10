import { User } from '@models/user/user';

export type ResponseType = {
    success: boolean;
    user?: User;
    token?: string;
    error?: string;
};