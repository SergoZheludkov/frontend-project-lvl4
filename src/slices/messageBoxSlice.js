import { createSlice } from '@reduxjs/toolkit';

const messagesBoxSlice = createSlice({
  name: 'messagesBox',
  initialState: {
    messages: [],
  },
  reducers: {
    initMessages: (state, { payload }) => {
      state.messages = payload.messages;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload.attributes);
    },
  },
  extraReducers: {
    'channelsBox/removeChannel': (state, { payload }) => {
      state.messages = state.messages.filter((m) => m.channelId !== payload.id);
    },
  },
});

export default messagesBoxSlice.reducer;
