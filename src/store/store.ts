
// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import menuReducer from '@store/slices/menuSlice';
import userReducer from '@store/slices/userSlice';
// import other reducers

const rootReducer = combineReducers({
    user: userReducer,
    menu: menuReducer,
    // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;
