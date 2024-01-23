import usersMock from '@data/usersMock';
import userProfilesMock from '@data/userProfilesMock';
import userRelationsMock from '@data/userRelationsMock';
import { UserFull } from '@models/user/userFull';
import { defaultUser, defaultUserDetails } from '@models/defaults';

export const myId = 11;

export const userService = {
    async getCurrentUser() {
        return usersMock.find(user => user.id === myId);
    },
    async getFullCurrentUser() : Promise<UserFull | undefined> {
        return this.getUserDetails(myId);
    },

    async getUserById(userId: number) {
        return usersMock.find(user => user.id === userId);
    },

    async getUserByUsername(username: string) {
        return usersMock.find(user => user.username === username);
    },

    async getAllUsers() {
        return usersMock;
    },

    async searchUsers(query: string)    {
        return usersMock.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
    },

    // New function to search users with a limit and sorted by most exact match
    async searchUsersWithLimit(query: string, limit: number)    {
        const users = usersMock.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
        const sortedUsers = users.sort((user1, user2) => {
            const user1ExactMatch = user1.username.toLowerCase() === query.toLowerCase();
            const user2ExactMatch = user2.username.toLowerCase() === query.toLowerCase();
            if (user1ExactMatch && !user2ExactMatch) {
                return -1;
            }
            if (!user1ExactMatch && user2ExactMatch) {
                return 1;
            }
            return 0;
        });
        return sortedUsers.slice(0, limit);
    },

    async getFollowers(userId: number) {
        const relations = userRelationsMock.find(relation => relation.userId === userId);
        return relations?.followers.map(followerId => this.getUserById(followerId));
    },

    async getFollowing(userId: number) {
        const relations = userRelationsMock.find(relation => relation.userId === userId);
        return relations?.following.map(followingId => this.getUserById(followingId));
    },

    async getUserProfile(userId: number) {
        return userProfilesMock.find(profile => profile.userId === userId);
    },

    // New function to get comprehensive user details
    async getUserDetails(userId: number): Promise<UserFull | undefined> {
        const user = usersMock.find((user) => user.id === userId);
        const userProfile = userProfilesMock.find((profile) => profile.userId === userId);
        const userRelations = userRelationsMock.find((relation) => relation.userId === userId);

        if (user && userProfile) {
            const userDetails: UserFull = {
                bio: userProfile.bio,
                location: userProfile.location,
                website: userProfile.website,
                background: userProfile.background,
                followersCount: userRelations?.followers.length || 0,
                followingCount: userRelations?.following.length || 0,
                id: user.id,
                username: user.username,
                verified: user.verified || false,
                avatar: user.avatar || defaultUser.avatar, // Use default avatar if user avatar is missing
                email: user.email,
                name: user.name,
                lastname: user.lastname || '',
                createdAt: user.createdAt,
            };

            return userDetails;
        }

        return defaultUserDetails; // Use the default user details if any data is missing
    },

    async getTreandingUsers(top: number): Promise<UserFull[]> {
        const users = usersMock.slice(0, top);
        const userDetailsPromises = users.map(user => this.getUserDetails(user.id));
        const userDetails = await Promise.all(userDetailsPromises);

        // Filter out undefined values to ensure the array only contains UserFull objects
        return userDetails.filter((user): user is UserFull => user !== undefined);
    },

    async getTopTenTreandingUsers(): Promise<UserFull[]> {
        return this.getTreandingUsers(10);
    },

};
