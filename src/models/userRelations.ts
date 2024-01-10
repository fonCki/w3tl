export interface UserRelations {
    userId: number;
    followers: number[]; // Array of user IDs who are followers
    following: number[]; // Array of user IDs who the user is following
}