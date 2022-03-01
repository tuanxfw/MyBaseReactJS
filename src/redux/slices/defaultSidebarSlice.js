import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
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
