
// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from '@store/slices/authSlice';
import menuReducer from '@store/slices/menuSlice';
import loadingReducer from '@store/slices/loadingSlice';
import searchReducer from '@store/slices/searchSlice';
import notificationsSlice from '@store/slices/notificationsSlice';

// import other reducers

const rootReducer = combineReducers({
    auth: auth,
    menu: menuReducer,
    loading: loadingReducer,
    search: searchReducer,
    notifications: notificationsSlice,
    // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;
