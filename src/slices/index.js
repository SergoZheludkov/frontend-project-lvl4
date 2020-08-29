import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';
import axios from 'axios';
import routes from '../routes';
// export const { sendNewMessage } = identifierSlice.actions;

// ---------------------------------------------------------------------------------------

const messagesBoxSlice = createSlice({
  name: 'messagesBox',
  initialState: {
    sendedState: 'none',
    messages: gon.messages,
    error: null,
  },
  reducers: {
    messageSending: (state) => ({ ...state, sendedState: 'requesting' }),
    messageSended: (state, action) => ({ ...state, sendedState: 'success', messages: [...state.messages, action.payload] }),
    messageSendingError: (state, action) => ({ ...state, sendedState: 'failed', error: action.payload.error }),
  },
});

const { messageSending, messageSended, messageSendingError } = messagesBoxSlice.actions;

export const addMessage = (attributes) => async (dispatch) => {
  dispatch(messageSending());
  try {
    const url = routes.channelMessagesPath(gon.currentChannelId);
    const response = await axios.post(url, { data: { attributes } });
    dispatch(messageSended(response.data.data.attributes));
  } catch (error) {
    dispatch(messageSendingError({ error }));
  }
};

// ---------------------------------------------------------------------------------------
/* const messagesBoxSlice = createSlice({
  name: 'messagesBox',
  initialState: {
    messages: gon.messages,
  },
  reducers: {
    addNewMessage: (state, action) => ({ messages: [...state.messages, action.payload] }),
  },
});

const { addNewMessage } = messagesBoxSlice.actions; */

export default combineReducers({
  messagesBox: messagesBoxSlice.reducer,
  // messagesBox: messagesBoxSlice.reducer,
});
