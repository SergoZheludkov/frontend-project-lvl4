import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalWindows',
  initialState: {
    type: null,
    channelId: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.channelId;
    },
    closeModal: () => ({
      type: null,
      channelId: null,
    }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
