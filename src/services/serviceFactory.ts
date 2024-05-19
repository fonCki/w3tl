// src/services/ServiceFactory.ts
import { IUserService } from '@interfaces/IUserService';
import { ITweetService } from '@interfaces/ITweetService';
import { IAuthService } from '@interfaces/IAuthService';
import { IUserProfileService } from '@interfaces/IUserProfileService';
import { IUserRelations } from '@interfaces/IUserRelations';
import { ITweetActionService } from '@interfaces/ITweetsActionService';
import { IMLService } from '@interfaces/IMLService';

import { IMessageService } from '@interfaces/IMessageService';
import { MessageService } from '@services/messageService';
import { OnionAuthService } from '@services/onion/onionAuthService';
import { firebaseUserRelationsService } from '@services/firebase/firebaseUserRelationsService';
import { firebaseUserProfileService } from '@services/firebase/firebaseUserProfileService';
import { firebaseTweetService } from '@services/firebase/firebaseTweetService';
import { firebaseUserService } from '@services/firebase/firebaseUserService';
import firebaseTweetActionService from '@services/firebase/firebaseTweetActionService';
import { PurgoMalumService } from '@services/ML/purgoMalumService';

/**
 * The ServiceFactory class is responsible for creating instances of various services used in the application.
 */
class ServiceFactory {
    private static authServiceInstance: IAuthService | null = null;
    private static tweetActionServiceInstance: ITweetActionService | null = null;
    private static tweetServiceInstance: ITweetService | null = null;
    private static userProfileServiceInstance: IUserProfileService | null = null;
    private static userRelationsServiceInstance: IUserRelations | null = null;
    private static userServiceInstance: IUserService | null = null;
    private static machineLearningServiceInstance: IMLService | null = null;
    private static messageServiceInstance: IMessageService | null = null;

    static getAuthService(): IAuthService {
        if (!this.authServiceInstance) {
            this.authServiceInstance = new OnionAuthService();
        }
        return this.authServiceInstance;
    }

    static getTweetActionService(): ITweetActionService {
        if (!this.tweetActionServiceInstance) {
            this.tweetActionServiceInstance = new firebaseTweetActionService();
        }
        return this.tweetActionServiceInstance;
    }

    static getUserService(): IUserService {
        if (!this.userServiceInstance) {
            this.userServiceInstance = new firebaseUserService();
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
            this.userProfileServiceInstance = new firebaseUserProfileService();
        }
        return this.userProfileServiceInstance;
    }

    static getUserRelationsService(): IUserRelations {
        if (!this.userRelationsServiceInstance) {
            this.userRelationsServiceInstance = new firebaseUserRelationsService();
        }
        return this.userRelationsServiceInstance;
    }

    static getMLService(): IMLService {
        if (!this.machineLearningServiceInstance) {
            this.machineLearningServiceInstance = new PurgoMalumService();
        }
        return this.machineLearningServiceInstance;
    }

    static getMessageService(): IMessageService {
        if (!this.messageServiceInstance) {
            this.messageServiceInstance = new MessageService();
        }
        return this.messageServiceInstance;
    }
}

export { ServiceFactory };
