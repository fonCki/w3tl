import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents the state of a menu.
 * @interface
 */
interface MenuState {
  isCompactMode: boolean;
  isVisible: boolean;
  activeTab: string;
  isCreatePostModalOpen: boolean;
}

/**
 * Represents the initial state of the menu.
 *
 * @typedef {Object} MenuState
 * @property {boolean} isCompactMode - Indicates if the menu is in compact mode.
 *                                    - Set to `false` for full mode, `true` for compact mode.
 * @property {boolean} isVisible - Indicates if the menu is visible.
 *                                - Set to `true` for visible, `false` for invisible.
 * @property {string} activeTab - The currently active tab in the menu.
 * @property {boolean} isCreatePostModalOpen - Indicates if the create post modal is open.
 *                                            - Set to `false` for closed, `true` for open.
 */
const initialState: MenuState = {
  isCompactMode: false, // false for full mode, true for compact mode
  isVisible: true,      // true for visible, false for invisible
  activeTab: "Home",
  isCreatePostModalOpen: false,
};

/**
 * Creates a Redux slice for the `menu` state.
 *
 * @name menuSlice
 * @type {Slice}
 */
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isCompactMode = !state.isCompactMode;
    },
    toggleVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    // Optionally, you can add specific setters if needed
    setCompactMode: (state, action: PayloadAction<boolean>) => {
      state.isCompactMode = action.payload;
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    toggleCreatePostModal: state => {
      state.isCreatePostModalOpen = !state.isCreatePostModalOpen;
    },
  },
});

export const { toggleMode, toggleVisibility, setCompactMode, setVisible, setActiveTab, toggleCreatePostModal } = menuSlice.actions;
export default menuSlice.reducer;
