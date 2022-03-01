//import { createSelector } from '@reduxjs/toolkit';

export const getStatusMessageBox = (state) => state.messageBox.isOpen;
export const getMessageData = (state) => state.messageBox.messageData;