// src/services/ServiceFactory.ts
import { IUserService } from '@interfaces/IUserService';
import { ITweetService } from '@interfaces/ITweetService';
import { IAuthService } from '@interfaces/IAuthService';
import { firebaseAuthService } from '@services/firebase/firebaseAuthService';
import { firebaseTweetService } from '@services/firebase/firebaseTweetService';
import { IUserProfileService } from '@interfaces/IUserProfileService';
import { IUserRelations } from '@interfaces/IUserRelations';
import { firebaseUserRelationsService } from '@services/firebase/firebaseUserRelationsService';
import { ITweetActionService } from '@interfaces/ITweetsActionService';
import { OnionUserProfileService } from '@services/onion/onionUserProfileService';
import { OnionUserService } from '@services/onion/onionUserService';
import { OnionTweetActionService } from '@services/onion/onionTweetActionService';

class ServiceFactory {
    private static authServiceInstance: IAuthService | null = null;
    private static tweetActionServiceInstance: ITweetActionService | null = null;
    private static tweetServiceInstance: ITweetService | null = null;
    private static userProfileServiceInstance: IUserProfileService | null = null;
    private static userRelationsServiceInstance: IUserRelations | null = null;
    private static userServiceInstance: IUserService | null = null;

    static getAuthService(): IAuthService {
        if (!this.authServiceInstance) {
            this.authServiceInstance = new firebaseAuthService();
        }
        return this.authServiceInstance;
    }

    static getTweetActionService(): ITweetActionService {
        if (!this.tweetActionServiceInstance) {
            this.tweetActionServiceInstance = new OnionTweetActionService();
        }
        return this.tweetActionServiceInstance;
    }

    static getUserService(): IUserService {
        if (!this.userServiceInstance) {
            this.userServiceInstance = new OnionUserService();
        }
        return this.userServiceInstance;
    }

    static getTweetService(): ITweetService {
        if (!this.tweetServiceInstance) {
            this.tweetServiceInstance = new firebaseTweetService();
        }
        return this.tweetServiceInstance;
    }

    static getUserProfileService(): IUserProfileService {
        if (!this.userProfileServiceInstance) {
            this.userProfileServiceInstance = new OnionUserProfileService();
        }
        return this.userProfileServiceInstance;
    }

    static getUserRelationsService(): IUserRelations {
        if (!this.userRelationsServiceInstance) {
            this.userRelationsServiceInstance = new firebaseUserRelationsService();
        }
        return this.userRelationsServiceInstance;
    }
}

export { ServiceFactory };
