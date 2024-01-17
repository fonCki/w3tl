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
};
