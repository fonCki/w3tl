// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { userService } from '@services/userService';
// import { setCurrentUser } from '@store/slices/authSlice';
// import { RootState } from '@store/store';
// import { UserFull } from '@models/user/userFull';
// import { defaultUserDetails } from '@models/defaults';
//
// export const useCurrentUser = (): UserFull => {
//     const dispatch = useDispatch();
//     const currentUser = useSelector((state: RootState) => state.auth.currentUser);
//
//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             try {
//                 const user = await userService.getFullCurrentUser();
//                 dispatch(setCurrentUser(user ?? defaultUserDetails));
//             } catch (error) {
//                 console.error('Error fetching current user:', error);
//                 dispatch(setCurrentUser(defaultUserDetails)); // Use default details in case of an error
//             }
//         };
//
//         fetchCurrentUser();
//     }, [dispatch]);
//
//     return currentUser ?? defaultUserDetails; // Return defaultUserDetails if currentUser is null or undefined
// };
