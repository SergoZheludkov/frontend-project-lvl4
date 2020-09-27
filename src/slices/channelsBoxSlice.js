import { createSlice } from '@reduxjs/toolkit';

const channelsBoxSlice = createSlice({
  name: 'channelsBox',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    initChannels: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload.id;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload.attributes);
    },
    renameChannel: (state, { payload }) => {
      const updatedChannels = state.channels.map((ch) => (
        ch.id === payload.id ? { ...ch, name: payload.attributes.name } : ch
      ));
      state.channels = updatedChannels;
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((ch) => ch.id !== payload.id);
    },
  },
});
export const { changeCurrentChannel } = channelsBoxSlice.actions;

export default channelsBoxSlice.reducer;
