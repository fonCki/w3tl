// src/services/ServiceFactory.ts
import { IUserService } from '@interfaces/IUserService';
import { ITweetService } from '@interfaces/ITweetService';
import { IAuthService } from '@interfaces/IAuthService';
import { IMyOwnService } from '@interfaces/IMyOwnService';
import { firebaseAuthService } from '@services/firebase/firebaseAuthService';
import { mockMyOwnService } from '@services/mock/mockMyOwnService';
import { firebaseUserService } from '@services/firebase/firebaseUserService';
import { firebaseTweetService } from '@services/firebase/firebaseTweetService';
import { myOwnFirebaseService } from '@services/firebase/myOwnFirebaseService';


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

    static getMyOwnService(): IMyOwnService {
        // This could be based on an environment variable or config
        // return mockMyOwnService; // Return the instance directly
        // return new FirebaseUserService(); when ready
        return new myOwnFirebaseService();
    }
}
