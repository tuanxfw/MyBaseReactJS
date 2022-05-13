import { combineReducers } from 'redux';

import defaultSidebarReducer from 'redux/slices/defaultSidebarSlice';
import messageBoxReducer from 'redux/slices/messageBoxSlice';
import circleLoadingReducer from 'redux/slices/circleLoadingSlice';


const rootReducer = combineReducers({
  defaultSidebar: defaultSidebarReducer,
  messageBox: messageBoxReducer,
  circleLoading: circleLoadingReducer,
});

export default rootReducer;
