import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'circleLoading',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleCircleLoading: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});
