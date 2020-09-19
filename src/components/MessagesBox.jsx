import React from 'react';
import { connect } from 'react-redux';
import { currentChannelMessagesSelector } from '../selectors';

// ------------------------------------------------------------------------
const mapStateToProps = (state) => ({ messages: currentChannelMessagesSelector(state) });

const MessagesBox = (props) => {
  const { messages } = props;

  const renderedMessage = messages.map((m) => <div key={m.id}><b>{m.nickname}: </b>{m.text}</div>);
  return (
    <div id="currentChat" className="border overflow-auto h-100 mb-3 p-3 rounded-lg">{renderedMessage}</div>
  );
};

export default connect(mapStateToProps)(MessagesBox);
