import { createSlice } from '@reduxjs/toolkit';

const messageBoxSlice = createSlice({
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

export default messageBoxSlice;

export const toggleMessageBox = messageBoxSlice.actions.toggleMessageBox;
export const setMessageData = messageBoxSlice.actions.setMessageData;