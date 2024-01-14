// slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserFull } from '@models/user/userFull';

interface UserState {
    currentUser: UserFull | null;
}

const initialState: UserState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<UserFull | null>) => {
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
