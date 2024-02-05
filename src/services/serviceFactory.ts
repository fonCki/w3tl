// src/services/ServiceFactory.ts
import { IUserService } from '@interfaces/IUserService';
import { ITweetService } from '@interfaces/ITweetService';
import { IAuthService } from '@interfaces/IAuthService';
import { firebaseAuthService } from '@services/firebase/firebaseAuthService';
import { firebaseUserService } from '@services/firebase/firebaseUserService';
import { firebaseTweetService } from '@services/firebase/firebaseTweetService';
import { IUserProfileService } from '@interfaces/IUserProfileService';
import { firebaseUserProfileService } from '@services/firebase/firebaseUserProfileService';
import { firebaseUserInteractionService } from '@services/firebase/firebaseUserInteractionService';
import { IUserRelations } from '@interfaces/IUserRelations';
import { firebaseUserRelationsService } from '@services/firebase/firebaseUserRelationsService';


export class ServiceFactory {
    static getAuthService(): IAuthService {
        // This could be based on an environment variable or config
        // return gunService; // Return the instance directly
        return new firebaseAuthService(); // when ready
    }

    static getUserService(): IUserService {
        // This could be based on an environment variable or config
        //return mockUserService; // Return the instance directly
        // return new FirebaseUserService(); when ready
        return new firebaseUserService();
    }

    static getTweetService(): ITweetService {
        // This could be based on an environment variable or config
        // return mockTweetService; // Return the instance directly
        // return new FirebaseUserService(); when ready
        return new firebaseTweetService();
    }

    static getUserProfileService(): IUserProfileService {
        return new firebaseUserProfileService();
    }

    static getUserRelationsService(): IUserRelations {
        return new firebaseUserRelationsService();
    }
}
