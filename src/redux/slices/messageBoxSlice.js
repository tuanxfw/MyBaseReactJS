import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'messageBox',
  initialState: {
    isOpen: false,
    messageData: {}
  },
  reducers: {
    toggleMessageBox: (state, action) => {
      state.isOpen = action.payload;
    },
    
    setMessageData: (state, action) => {
      state.messageData = action.payload;
    },
  },
});
