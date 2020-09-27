import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    translations: ['en', 'ru'],
    current: 'en',
  },
  reducers: {
    changeCurrentLanguage: (state, { payload }) => {
      state.current = payload.lang;
    },
  },
});

export const { changeCurrentLanguage } = languageSlice.actions;
export default languageSlice.reducer;
