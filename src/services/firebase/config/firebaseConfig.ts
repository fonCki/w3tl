import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/**
 * Configuration object for Firebase.
 *
 * @typedef {Object} FirebaseConfig
 * @property {string} apiKey - The API key for accessing Firebase services.
 * @property {string} authDomain - The domain for authenticating user sessions.
 * @property {string} projectId - The unique identifier for the Firebase project.
 * @property {string} storageBucket - The storage bucket to store files and images.
 * @property {string} messagingSenderId - The ID for sending messages to users.
 * @property {string} appId - The application ID for identifying your Firebase project.
 * @property {string} measurementId - The ID for gathering analytics data.
 *
 * @example
 * const firebaseConfig = {
 *   apiKey: 'YOUR_API_KEY',
 *   authDomain: 'YOUR_AUTH_DOMAIN',
 *   projectId: 'YOUR_PROJECT_ID',
 *   storageBucket: 'YOUR_STORAGE_BUCKET',
 *   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
 *   appId: 'YOUR_APP_ID',
 *   measurementId: 'YOUR_MEASUREMENT_ID'
 * };
 */
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

/**
 * Initializes the Firebase app with the provided configuration object.
 *
 * @param {Object} firebaseConfig - The configuration object containing the Firebase project credentials.
 * @returns {FirebaseApp} - The initialized Firebase app instance.
 */
const app = initializeApp(firebaseConfig);
/**
 * Represents a Firestore database instance.
 *
 * @class
 * @constructor
 * @param {Object} app - The Firebase app object.
 * @returns {Object} A Firestore database instance.
 */
const db = getFirestore(app);

/**
 * Retrieves the authentication information for the given app.
 *
 * @param {string} app - The name or identifier of the app.
 * @returns {object} - The authentication information for the app.
 */
const auth = getAuth(app);

export { app, auth, db };