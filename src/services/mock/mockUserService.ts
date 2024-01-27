import usersMock from '@data/usersMock';
import userRelationsMock from '@data/userRelationsMock';
import userProfilesMock from '@data/userProfilesMock';
import { UserFull } from '@models/user/userFull';
import { IUserService } from '@interfaces/IUserService';
import { defaultUser } from '@models/defaults';

export const mockUserService: IUserService = {

    async getUserById(userId: string): Promise<UserFull | undefined> {
        const user = usersMock.find(user => user.id === userId);
        return user ? this.getUserDetails(userId) : undefined;
    },

    async getUserByUsername(username: string): Promise<UserFull | undefined> {
        const user = usersMock.find(user => user.username === username);
        return user ? this.getUserDetails(user.id) : undefined;
    },

    async getAllUsers(): Promise<UserFull[]> {
        return Promise.all(usersMock.map(user => this.getUserDetails(user.id) as Promise<UserFull>));
    },

    async searchUsers(query: string): Promise<UserFull[]> {
        const filteredUsers = usersMock.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
        return Promise.all(filteredUsers.map(user => this.getUserDetails(user.id) as Promise<UserFull>));
    },

    async searchUsersWithLimit(query: string, limit: number): Promise<UserFull[]> {
        const filteredUsers = usersMock.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
        const sortedUsers = filteredUsers.sort((user1, user2) => {
            const user1ExactMatch = user1.username.toLowerCase() === query.toLowerCase();
            const user2ExactMatch = user2.username.toLowerCase() === query.toLowerCase();
            if (user1ExactMatch && !user2ExactMatch) return -1;
            if (!user1ExactMatch && user2ExactMatch) return 1;
            return 0;
        });
        return Promise.all(sortedUsers.slice(0, limit).map(user => this.getUserDetails(user.id) as Promise<UserFull>));
    },

    async getUserDetails(username: string): Promise<UserFull | undefined> {
        const user = usersMock.find((user) => user.id === username);
        const userProfile = userProfilesMock.find((profile) => profile.id === username);
        const userRelations = userRelationsMock.find((relation) => relation.id === username);

        if (user && userProfile) {
            return {
                ...user,
                bio: userProfile.bio,
                location: userProfile.location,
                website: userProfile.website,
                background: userProfile.background,
                followersCount: userRelations?.followers.length || 0,
                followingCount: userRelations?.following.length || 0,
                verified: user.verified || false,
                avatar: user.avatar || defaultUser.avatar,
                pub: userProfile.pub,
            };
        }
        return undefined;
    },

    async getTreandingUsers(top: number): Promise<UserFull[]> {
        const users = usersMock.slice(0, top);
        return Promise.all(users.map(user => this.getUserDetails(user.id) as Promise<UserFull>));
    },

    async getTopTenTreandingUsers(): Promise<UserFull[]> {
        return this.getTreandingUsers(10);
    },

    getFollowers(username: string): Promise<UserFull[]> {
        return Promise.resolve([]);
    }, getFollowing(username: string): Promise<UserFull[]> {
        return Promise.resolve([]);
    }, getUserProfile(username: string): Promise<UserFull | undefined> {
        return Promise.resolve(undefined);
    }
};
