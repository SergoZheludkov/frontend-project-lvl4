import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';
import axios from 'axios';
import routes from '../routes';

const messagesInputSlice = createSlice({
  name: 'messagesInput',
  initialState: {
    sendedState: 'none',
    error: null,
  },
  reducers: {
    messageSending: (state) => ({ ...state, sendedState: 'requesting' }),
    messageSended: (state) => ({ ...state, sendedState: 'success' }),
    messageSendingError: (state, action) => ({ ...state, sendedState: 'failed', error: action.payload.error }),
  },
});
const { messageSending, messageSended, messageSendingError } = messagesInputSlice.actions;

export const addMessage = (attributes) => async (dispatch) => {
  dispatch(messageSending());
  try {
    const url = routes.channelMessagesPath(gon.currentChannelId);
    await axios.post(url, { data: { attributes } });
    dispatch(messageSended());
  } catch (error) {
    dispatch(messageSendingError({ error }));
  }
};
// ------------------------------------------------------------------------
const messagesBoxSlice = createSlice({
  name: 'messagesBox',
  initialState: {
    messages: gon.messages,
  },
  reducers: {
    updateMessages: (state, action) => (
      { messages: [...state.messages, action.payload.attributes] }
    ),
  },
});
// ------------------------------------------------------------------------
export default combineReducers({
  messagesBox: messagesBoxSlice.reducer,
  messageInput: messagesInputSlice.reducer,
});
