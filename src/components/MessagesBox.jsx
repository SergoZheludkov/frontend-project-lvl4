import React from 'react';
import { useSelector } from 'react-redux';
import { currentChannelMessagesSelector } from '../selectors';

const MessagesBox = () => {
  const messages = useSelector(currentChannelMessagesSelector);

  const renderedMessage = messages.map((m) => <div key={m.id}><b>{m.nickname}: </b>{m.text}</div>);
  return (
    <div id="currentChat" className="border overflow-auto h-100 mb-3 p-3 rounded-lg">{renderedMessage}</div>
  );
};

export default MessagesBox;
