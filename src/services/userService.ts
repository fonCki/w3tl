import usersMock from '@data/usersMock.json';
import userProfilesMock from '@data/userProfilesMock.json';
import userRelationsMock from '@data/userRelations.json';

export const userService = {
    getUserById(userId: number) {
        return usersMock.find(user => user.id === userId);
    },

    getAllUsers() {
        return usersMock;
    },

    getFollowers(userId: number) {
        const relations = userRelationsMock.find(relation => relation.userId === userId);
        return relations?.followers.map(followerId => this.getUserById(followerId));
    },

    getFollowing(userId: number) {
        const relations = userRelationsMock.find(relation => relation.userId === userId);
        return relations?.following.map(followingId => this.getUserById(followingId));
    },

    getUserProfile(userId: number) {
        return userProfilesMock.find(profile => profile.userId === userId);
    },

    // New function to get comprehensive user details
    getUserDetails(userId: number) {
        const user = this.getUserById(userId);
        const userProfile = this.getUserProfile(userId);
        const userRelations = userRelationsMock.find(relation => relation.userId === userId);

        if (!user) return null;

        return {
            ...user,
            bio: userProfile?.bio,
            location: userProfile?.location,
            website: userProfile?.website,
            followersCount: userRelations?.followers.length || 0,
            followingCount: userRelations?.following.length || 0,
        };
    }
};
