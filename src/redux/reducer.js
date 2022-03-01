import { combineReducers } from 'redux';

import defaultSidebarReducer from 'redux/slices/defaultSidebarSlice';
import messageBoxReducer from 'redux/slices/messageBoxSlice';
import dialogReducer from 'redux/slices/dialogSlice';
import circleLoadingReducer from 'redux/slices/circleLoadingSlice';


const rootReducer = combineReducers({
  defaultSidebar: defaultSidebarReducer,
  messageBox: messageBoxReducer,
  dialog: dialogReducer,
  circleLoading: circleLoadingReducer,
});

export default rootReducer;
