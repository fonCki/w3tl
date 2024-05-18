// notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents the state of notifications for a user.
 * @interface
 */
interface NotificationsState {
    hasNewFollower: boolean;
    hasNewFollowing: boolean;
    newTweet: boolean;
    newLike: boolean;
    newRetweet: boolean;
    newComment: boolean;
    newHighlight: boolean;
}

/**
 * The initial state of the notifications module.
 *
 * @typedef {Object} NotificationsState
 * @property {boolean} hasNewFollower - Indicates whether there is a new follower notification.
 * @property {boolean} hasNewFollowing - Indicates whether there is a new following notification.
 * @property {boolean} newTweet - Indicates whether there is a new tweet notification.
 * @property {boolean} newLike - Indicates whether there is a new like notification.
 * @property {boolean} newRetweet - Indicates whether there is a new retweet notification.
 * @property {boolean} newComment - Indicates whether there is a new comment notification.
 * @property {boolean} newHighlight - Indicates whether there is a new highlight notification.
 */
const initialState: NotificationsState = {
    hasNewFollower: false,
    hasNewFollowing: false,
    newTweet: false,
    newLike: false,
    newRetweet: false,
    newComment: false,
    newHighlight: false,
};

/**
 * Redux slice for managing notification state.
 * @typedef {Object} NotificationsSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Function} reducers.setHasNewFollower - A reducer that sets whether there is a new follower.
 * @property {Function} reducers.setHasNewFollowing - A reducer that sets whether there is a new following.
 * @property {Function} reducers.setNewTweet - A reducer that sets whether there is a new tweet.
 * @property {Function} reducers.setNewLike - A reducer that sets whether there is a new like.
 * @property {Function} reducers.setNewRetweet - A reducer that sets whether there is a new retweet.
 * @property {Function} reducers.setNewComment - A reducer that sets whether there is a new comment.
 * @property {Function} reducers.setNewHighlight - A reducer that sets whether there is a new highlight.
 * @property {Function} reducers.resetHasNewFollower - A reducer that resets the new follower state.
 * @property {Function} reducers.resetHasNewFollowing - A reducer that resets the new following state.
 * @property {Function} reducers.resetNewTweet - A reducer that resets the new tweet state.
 * @property {Function} reducers.resetNewLike - A reducer that resets the new like state.
 * @property {Function} reducers.resetNewRetweet - A reducer that resets the new retweet state.
 * @property {Function} reducers.resetNewComment - A reducer that resets the new comment state.
 * @property {Function} reducers.resetNewHighlight - A reducer that resets the new highlight state.
 */
const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setHasNewFollower(state, action: PayloadAction<boolean>) {
            state.hasNewFollower = action.payload;
        },
        setHasNewFollowing(state, action: PayloadAction<boolean>) {
            state.hasNewFollowing = action.payload;
        },
        setNewTweet(state, action: PayloadAction<boolean>) {
            state.newTweet = action.payload;
        },
        setNewLike(state, action: PayloadAction<boolean>) {
            state.newLike = action.payload;
        },
        setNewRetweet(state, action: PayloadAction<boolean>) {
            state.newRetweet = action.payload;
        },
        setNewComment(state, action: PayloadAction<boolean>) {
            state.newComment = action.payload;
        },
        setNewHighlight(state, action: PayloadAction<boolean>) {
            state.newHighlight = action.payload;
        },
        resetHasNewFollower(state) {
            state.hasNewFollower = false;
        },
        resetHasNewFollowing(state) {
            state.hasNewFollowing = false;
        },
        resetNewTweet(state) {
            state.newTweet = false;
        },
        resetNewLike(state) {
            state.newLike = false;
        },
        resetNewRetweet(state) {
            state.newRetweet = false;
        },
        resetNewComment(state) {
            state.newComment = false;
        },
        resetNewHighlight(state) {
            state.newHighlight = false;
        },
    },
});

export const {
    setHasNewFollower, setHasNewFollowing, setNewTweet,
    setNewLike, setNewRetweet, setNewComment, setNewHighlight,
    resetHasNewFollower, resetHasNewFollowing,
    resetNewTweet, resetNewLike, resetNewRetweet, resetNewComment, resetNewHighlight
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
