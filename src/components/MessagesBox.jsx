import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const getMessages = (state) => state.messagesBox.messages;
const getCurrentChannelId = (state) => state.channelsBox.currentChannelId;

const getCurrentChannelMessages = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, currentChannelId) => messages.filter((m) => m.channelId === currentChannelId),
);
// ------------------------------------------------------------------------
const mapStateToProps = (state) => ({ messages: getCurrentChannelMessages(state) });

const MessagesBox = (props) => {
  const { messages } = props;

  const renderedMessage = messages.map((m) => <div key={m.id}><b>{m.nickname}: </b>{m.text}</div>);
  return (
    <div id="currentChat" className="border overflow-auto h-100 mb-3 p-3 rounded-lg">{renderedMessage}</div>
  );
};

export default connect(mapStateToProps)(MessagesBox);
