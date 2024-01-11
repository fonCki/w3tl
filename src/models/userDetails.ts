export interface UserDetails {
    bio?: string;
    location?: string;
    website?: string;
    background?: string;
    followersCount: number;
    followingCount: number;
    id: number;
    username: string;
    verified: boolean;
    avatar: string;
    email?: string;
    name?: string;
    lastname?: string;
    createdAt: Date;
}
