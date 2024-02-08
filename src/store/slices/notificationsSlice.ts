// notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationsState {
    hasNewFollower: boolean;
    hasNewFollowing: boolean;
    newTweet: boolean;
    newLike: boolean;
    newRetweet: boolean;
    newComment: boolean;
    newHighlight: boolean;
}

const initialState: NotificationsState = {
    hasNewFollower: false,
    hasNewFollowing: false,
    newTweet: false,
    newLike: false,
    newRetweet: false,
    newComment: false,
    newHighlight: false,
};

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

        // General reset remains useful for clearing all notifications at once
        // resetNotifications(state) {
        //     state.hasNewFollower = false;
        //     state.hasNewFollowing = false;
        //     state.newTweet = false;
        //     state.newLike = false;
        //     state.newRetweet = false;
        //     state.newComment = false;
        //     state.newHighlight = false;
        // }
    },
});

export const {
    setHasNewFollower, setHasNewFollowing, setNewTweet,
    setNewLike, setNewRetweet, setNewComment, setNewHighlight,
    resetHasNewFollower, resetHasNewFollowing,
    resetNewTweet, resetNewLike, resetNewRetweet, resetNewComment, resetNewHighlight
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
