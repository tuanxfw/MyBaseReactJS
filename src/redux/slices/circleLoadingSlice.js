import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
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
