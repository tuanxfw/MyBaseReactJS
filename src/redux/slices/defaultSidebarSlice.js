import { createSlice } from '@reduxjs/toolkit';

const sideBarSlice =  createSlice({
  name: 'defaultSidebar',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleSideBar: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export default sideBarSlice;

export const toggleSideBar = sideBarSlice.actions.toggleSideBar;
