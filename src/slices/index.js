import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';
import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'lodash';
import routes from '../routes';

// ------------------------------------------------------------------------
const messagesBoxSlice = createSlice({
  name: 'messagesBox',
  initialState: {
    messages: gon.messages,
  },
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload.attributes);
    },
  },
  extraReducers: {
    'channelsBox/removeChannel': (state, { payload }) => {
      state.messages = _.reject(state.messages, { channelId: payload.id });
    },
  },
});
// ------------------------------------------------------------------------
const modalSlice = createSlice({
  name: 'modalWindows',
  initialState: {
    status: 'none',
    type: null,
    channelId: null,
    errors: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.channelId;
    },
    closeModal: () => ({
      status: 'none',
      type: null,
      channelId: null,
      errors: null,
    }),

    channelRequesting: (state) => {
      state.status = 'requesting';
    },
    channelSuccess: (state) => {
      state.status = 'success';
    },
    channelError: (state, { payload }) => {
      state.status = 'failed';
      state.errors = payload.error.message;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
const { channelRequesting, channelSuccess, channelError } = modalSlice.actions;

const days = 5;
const setNickname = (setCookie) => ({ nickname }) => {
  setCookie('nickname', nickname, { expires: days });
};
const createChannel = (post) => async ({ attributes }) => {
  const url = routes.channelsPath();
  await post(url, { data: { attributes } });
};
const renameChannel = (patch) => async ({ attributes, channelId }) => {
  const url = routes.channelPath(channelId);
  await patch(url, { data: { attributes } });
};
const removeChannel = (del) => async ({ channelId }) => {
  const url = routes.channelPath(channelId);
  await del(url);
};

const modalOperationsMap = {
  setNick: setNickname(Cookies.set),
  create: createChannel(axios.post),
  rename: renameChannel(axios.patch),
  remove: removeChannel(axios.delete),
};
const timeToCloseModal = 2000;
export const getTheOperation = (type, params) => async (dispatch) => {
  dispatch(channelRequesting());
  try {
    await modalOperationsMap[type](params);
    dispatch(channelSuccess());
    setTimeout(() => {
      dispatch(closeModal());
      if (type === 'setNick') window.location.reload();
    }, timeToCloseModal);
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
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload.id;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload.attributes);
    },
    renameChannel: (state, { payload }) => {
      const selectedChannel = _.find(state.channels, { id: payload.id });
      selectedChannel.name = payload.attributes.name;
    },
    removeChannel: (state, { payload }) => {
      state.channels = _.reject(state.channels, { id: payload.id });
    },
  },
});
export const { changeCurrentChannel } = channelsBoxSlice.actions;
// ------------------------------------------------------------------------
export default combineReducers({
  messagesBox: messagesBoxSlice.reducer,

  channelsBox: channelsBoxSlice.reducer,
  modalWindows: modalSlice.reducer,
});
