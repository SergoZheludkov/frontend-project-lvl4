import { combineReducers } from 'redux';
import languageReducer from './languageSlice';
import messageReducer from './messageBoxSlice';
import modalReducer from './modalSlice';
import channelsReducer from './channelsBoxSlice';

export default combineReducers({
  language: languageReducer,
  messagesBox: messageReducer,
  channelsBox: channelsReducer,
  modalWindows: modalReducer,
});
