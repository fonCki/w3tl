import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HOME_MENU_ROUTE, HOME_ROUTE, menuItems } from '@constants/routesConfig';

interface MenuState {
  isCompactMode: boolean;
  isVisible: boolean;
  activeTab: string;
  isCreatePostModalOpen: boolean;
}

const initialState: MenuState = {
  isCompactMode: false, // false for full mode, true for compact mode
  isVisible: true,      // true for visible, false for invisible
  // activeTab: menuItems[0].label,
  activeTab: "Home",
  isCreatePostModalOpen: false,

};

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

// Export the actions
export const { toggleMode, toggleVisibility, setCompactMode, setVisible, setActiveTab, toggleCreatePostModal } = menuSlice.actions;
export default menuSlice.reducer;
