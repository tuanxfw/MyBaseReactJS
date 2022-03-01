import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'dialog',
  initialState: {
    dialogItems: [],
    // isOpen: false,
    // content: [],
    // options: null,
  },
  reducers: {
    // toggleDialog: (state, action) => {
    //   state.isOpen = action.payload;
    // },
    
    // setContentDialog: (state, action) => {
    //   state.content = action.payload;
    // },

    // setOptionsDialog: (state, action) => {
    //   state.options = action.payload;
    // },

    setDialogItems: (state, action) => {
      state.dialogItems = action.payload;
    },
  },
});
