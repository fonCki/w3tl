// src/services/ServiceFactory.ts
import { IUserService } from '@interfaces/IUserService';
import { ITweetService } from '@interfaces/ITweetService';
import { IAuthService } from '@interfaces/IAuthService';
import { IMyOwnService } from '@interfaces/IMyOwnService';

import { gunService } from '@services/gun/gunService';
import { mockUserService } from '@services/mock/mockUserService';
import { mockTweetService } from '@services/mock/mockTweetService';
import { mockMyOwnService } from '@services/mock/mockMyOwnService';


export class ServiceFactory {
    static getAuthService(): IAuthService {
        // This could be based on an environment variable or config
        return gunService; // Return the instance directly
        // return new FirebaseUserService(); when ready
    }

    static getUserService(): IUserService {
        // This could be based on an environment variable or config
        return mockUserService; // Return the instance directly
        // return new FirebaseUserService(); when ready
    }

    static getTweetService(): ITweetService {
        // This could be based on an environment variable or config
        return mockTweetService; // Return the instance directly
        // return new FirebaseUserService(); when ready
    }

    static getMyOwnService(): IMyOwnService {
        // This could be based on an environment variable or config
        return mockMyOwnService; // Return the instance directly
        // return new FirebaseUserService(); when ready
    }
}
