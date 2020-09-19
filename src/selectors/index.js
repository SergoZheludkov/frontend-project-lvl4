import { createSelector } from 'reselect';
import _ from 'lodash';

const getChannels = (state) => state.channelsBox.channels;
const getSelectedChannelId = (state) => state.modalWindows.channelId;
export const currentChannelDataSelector = createSelector(
  getChannels,
  getSelectedChannelId,
  (channels, selectedChannelId) => _.find(channels, { id: selectedChannelId }),
);

const getMessages = (state) => state.messagesBox.messages;
const getCurrentChannelId = (state) => state.channelsBox.currentChannelId;
export const currentChannelMessagesSelector = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, currentChannelId) => messages.filter((m) => m.channelId === currentChannelId),
);
