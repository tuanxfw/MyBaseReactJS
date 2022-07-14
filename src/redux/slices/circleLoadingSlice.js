import { createSlice } from '@reduxjs/toolkit';

const circleLoadingSlice = createSlice({
  name: 'circleLoading',
  initialState: {
    registration: 0,
  },
  reducers: {
    setRegistrationCircleLoading: (state, action) => {
      state.registration = action.payload;
    },
  },
});

export default circleLoadingSlice;

export const setRegistrationCircleLoading = circleLoadingSlice.actions.setRegistrationCircleLoading;

