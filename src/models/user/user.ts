/**
 * Represents a User in the system.
 *
 * @interface
 */
export interface User {
    userId: string;             // Unique identifier for the user
    username: string;           // Username for the user
    name: string;               // User's name
    lastname: string;           // User's last name, optional
    email?: string;             // User's email, can be null or hidden based on context
    avatar?: string;            // URL to the user's avatar image, optional
    bio?: string;               // User's biography
    location?: string;          // User's location
    website?: string;           // User's personal or professional website
    verified: boolean;          // Whether the user's profile is verified
    createdAt: string;          // Date the user profile was created
    followersCount: number;     // Number of followers
    followingCount: number;     // Number of users this user is following
    background?: string;        // Background image URL, optional
    pub?: string;               // Public key or identifier for cryptographic purposes
}
