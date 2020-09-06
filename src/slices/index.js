import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';
import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'lodash';
import routes from '../routes';

// ------------------------------------------------------------------------
const messagesInputSlice = createSlice({
  name: 'messagesInput',
  initialState: {
    sendingState: 'none',
    error: null,
  },
  reducers: {
    messageSending: (state) => ({ ...state, sendingState: 'requesting' }),
    messageSended: (state) => ({ ...state, sendingState: 'success' }),
    messageSendingError: (state, action) => ({ ...state, sendingState: 'failed', error: action.payload.error }),
  },
});
const { messageSending, messageSended, messageSendingError } = messagesInputSlice.actions;

export const addMessage = (attributes, channelId) => async (dispatch) => {
  dispatch(messageSending());
  try {
    const url = routes.channelMessagesPath(channelId);
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
    addMessage: (state, action) => (
      { messages: [...state.messages, action.payload.attributes] }
    ),
    removeMessages: (state, action) => (
      { messages: _.reject(state.messages, { channelId: action.payload.id }) }
    ),
  },
});
// ------------------------------------------------------------------------
const modalSlice = createSlice({
  name: 'modalWindow',
  initialState: {
    status: 'none',
    type: null,
    channelId: null,
    errors: null,
  },
  reducers: {
    openIdentificationModal: (state) => ({ ...state, type: 'identification' }),
    openCreateModal: (state) => ({ ...state, type: 'create' }),
    openRenameModal: (state, action) => ({ ...state, type: 'rename', channelId: action.payload.id }),
    openRemoveModal: (state, action) => ({ ...state, type: 'remove', channelId: action.payload.id }),
    closeModal: () => ({
      status: 'none',
      type: null,
      channelId: null,
      errors: null,
    }),

    channelRequesting: (state) => ({ ...state, status: 'requesting' }),
    channelSuccess: (state) => ({ ...state, status: 'success' }),
    channelError: (state, action) => ({ ...state, status: 'failed', errors: action.payload.error.message }),
  },
});

export const {
  openIdentificationModal,
  openCreateModal,
  openRenameModal,
  openRemoveModal,
  closeModal,
} = modalSlice.actions;

const {
  channelRequesting,
  channelSuccess,
  channelError,
} = modalSlice.actions;

const days = 5;
export const setNickName = ({ nickname }) => async (dispatch) => {
  dispatch(channelRequesting());
  try {
    Cookies.set('nickname', nickname, { expires: days });
    dispatch(channelSuccess());
    setTimeout(() => {
      dispatch(closeModal());
      window.location.reload();
    }, 2000);
  } catch (error) {
    dispatch(channelError({ error }));
  }
};

export const createChannel = (attributes) => async (dispatch) => {
  dispatch(channelRequesting());
  try {
    const url = routes.channelsPath();
    await axios.post(url, { data: { attributes } });
    dispatch(channelSuccess());
    setTimeout(() => {
      dispatch(closeModal());
    }, 2000);
  } catch (error) {
    dispatch(channelError({ error }));
  }
};

export const renameChannel = (attributes, channelId) => async (dispatch) => {
  dispatch(channelRequesting());
  try {
    const url = routes.channelPath(channelId);
    await axios.patch(url, { data: { attributes } });
    dispatch(channelSuccess());
    setTimeout(() => {
      dispatch(closeModal());
    }, 2000);
  } catch (error) {
    dispatch(channelError({ error }));
  }
};

export const removeChannel = (channelId) => async (dispatch) => {
  dispatch(channelRequesting());
  try {
    const url = routes.channelPath(channelId);
    await axios.delete(url);
    dispatch(channelSuccess());
    setTimeout(() => {
      dispatch(closeModal());
    }, 2000);
  } catch (error) {
    dispatch(channelError({ error }));
  }
};
// ------------------------------------------------------------------------
const channelsBoxSlice = createSlice({
  name: 'channelsBox',
  initialState: {
    channels: gon.channels,
    currentChannelId: gon.currentChannelId,
  },
  reducers: {
    changeCurrentChannel: (state, action) => ({ ...state, currentChannelId: action.payload.id }),
    addChannel: (state, action) => (
      { ...state, channels: [...state.channels, action.payload.attributes] }
    ),
    renameChannel: (state, action) => {
      const selectedChannel = _.find(state.channels, { id: action.payload.id });
      selectedChannel.name = action.payload.attributes.name;
    },
    removeChannel: (state, action) => {
      const filtredChannels = _.reject(state.channels, { id: action.payload.id });
      return { ...state, channels: filtredChannels };
    },
  },
});
export const { changeCurrentChannel } = channelsBoxSlice.actions;
// ------------------------------------------------------------------------
export default combineReducers({
  messagesBox: messagesBoxSlice.reducer,
  messageInput: messagesInputSlice.reducer,
  channelsBox: channelsBoxSlice.reducer,
  modalWindows: modalSlice.reducer,
});
