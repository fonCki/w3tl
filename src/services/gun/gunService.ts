// src/services/gun/gunService.ts
import Gun from 'gun';
import 'gun/sea';
import { UserFull } from '@models/user/userFull';
import { IAuthService } from '@interfaces/IAuthService';

const gun = Gun();

const aliasFinalCut = (alias: string | undefined): string => {
    if (!alias) {
        console.error('Alias is undefined');
        return '';
    }
    const parts = alias.split('-');
    return parts.length > 0 ? parts[0] : alias;
};

const currentUser = () => gun.user().recall({ sessionStorage: true });

const checkUsername = async (username: string): Promise<boolean> => {
    return new Promise((resolve) => {
        gun.get(`users/${username}`).once((data) => {
            resolve(!!data);
        });
    });
};

class GunAuthService implements IAuthService {
    async createUser(username: string, name: string, lastname: string, email: string, password: string): Promise<{ success: boolean; newUser?: UserFull; error?: any }> {
        return new Promise(async (resolve, reject) => {
            const usernameExists = await checkUsername(username);
            if (usernameExists) {
                return reject({ success: false, error: 'Username already exists' });
            }

            gun.user().create(username, password, (ack) => {
                if ('err' in ack) {
                    console.error('Error creating user:', ack.err);
                    reject({ success: false, error: ack.err });
                } else {
                    console.log('User created:', ack);
                    const fullUser: UserFull = {
                        bio: 'Culinary enthusiast and food blogger, Tech enthusiast and VR innovator',
                        location: 'Tandil, Argentina',
                        website: 'https://alfonso.ridao.ar',
                        background: 'https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/09/Apple-TV.png?w=1500&quality=82&strip=all&ssl=1',
                        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKhjPCUUYR4SLVcVW5V4yZpSYVYba9MxKEsGP3U5AubmHA=s96-c',
                        verified: true,
                        followersCount: 0,
                        followingCount: 0,
                        id: aliasFinalCut(ack.pub),
                        username,
                        email,
                        name,
                        lastname,
                        pub: ack.pub,
                    };

                    gun.get(`users/${fullUser.id}`).put(fullUser, (putAck: any) => {
                        if (putAck.err) {
                            console.error('Error saving user data:', putAck.err);
                            reject({ success: false, error: putAck.err });
                        } else {
                            console.log('User created with full data:', fullUser);
                            resolve({ success: true, newUser: fullUser });
                        }
                    });
                }
            });
        });
    }

    async getCurrentUser(): Promise<UserFull | undefined> {
        console.log('Getting current user...');
        return new Promise((resolve) => {
            const user = currentUser();
            if (user.is) {
                gun.get(`users/${aliasFinalCut(user.is.alias)}`).once((userData) => {
                    if (userData) {
                        const fullUserData: UserFull = { id: user.is.pub, ...userData };
                        resolve(fullUserData);
                    } else {
                        resolve(undefined);
                    }
                });
            } else {
                resolve(undefined);
            }
        });
    }

    async authenticate(username: string, password: string): Promise<{ success: boolean; user?: UserFull; error?: any }> {
        return new Promise((resolve, reject) => {
            gun.user().auth(username, password, (ack) => {
                if ('err' in ack) {
                    reject({ success: false, error: ack.err });
                } else {
                    console.log('User authenticated:', ack);
                    const userNode = gun.get(`users/${aliasFinalCut(ack.put.pub)}`);
                    userNode.once((userData) => {
                        if (userData) {
                            resolve({ success: true, user: userData });
                        } else {
                            reject({ success: false, error: 'User data not found' });
                        }
                    });
                }
            });
        });
    }

    isAuthenticated(): boolean {
        const user = currentUser();
        return !!user.is;
    }

    logout(): void {
        console.log('Logging out...');
        gun.user().leave();
    }
}

export const gunService = new GunAuthService();
