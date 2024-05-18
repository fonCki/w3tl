import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from '@store/slices/authSlice';
import menuReducer from '@store/slices/menuSlice';
import loadingReducer from '@store/slices/loadingSlice';
import searchReducer from '@store/slices/searchSlice';
import notificationsSlice from '@store/slices/notificationsSlice';

// import other reducers

/**
 * The rootReducer is a function that combines multiple reducers into a single reducer.
 * It takes an object with keys representing different parts of the application state and their corresponding reducers as values.
 *
 * @function
 * @name rootReducer
 * @param {Object} reducers - An object with keys representing different parts of the application state and their corresponding reducers as values.
 * @returns {Function} A single reducer function that combines all the provided reducers.
 *
 * @example
 *
 * const rootReducer = combineReducers({
 *    auth: auth,
 *    menu: menuReducer,
 *    loading: loadingReducer,
 *    search: searchReducer,
 *    notifications: notificationsSlice,
 *    // other reducers
 * });
 */
const rootReducer = combineReducers({
    auth: auth,
    menu: menuReducer,
    loading: loadingReducer,
    search: searchReducer,
    notifications: notificationsSlice,
    // other reducers
});

/**
 * Represents the state of the application's root reducer.
 *
 * @typedef {Object} RootState
 * @property {typeof rootReducer} - The type of the root reducer.
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Variable store represents the configured Redux store.
 *
 * @type {ReduxStore}
 */
const store = configureStore({
    reducer: rootReducer,
});

export default store;
