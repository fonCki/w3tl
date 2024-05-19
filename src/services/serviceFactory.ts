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
import { onionAuthService } from '@services/onion/onionAuthService';
import { OnionTweetActionService } from '@services/onion/onionTweetActionService';
import { MachineLearningService } from '@services/ML/machineLearningService';
import { OnionTweetService } from '@services/onion/onionTweetService';
import { OnionUserService } from '@services/onion/onionUserService';
import { OnionUserProfileService } from '@services/onion/onionUserProfileService';
import { OnionUserRelationsService } from '@services/onion/onionUserRelationsService';

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
            this.authServiceInstance = new onionAuthService();
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
            this.tweetServiceInstance = new OnionTweetService();
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
            this.userRelationsServiceInstance = new OnionUserRelationsService();
        }
        return this.userRelationsServiceInstance;
    }

    static getMLService(): IMLService {
        if (!this.machineLearningServiceInstance) {
            this.machineLearningServiceInstance = new MachineLearningService();
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
