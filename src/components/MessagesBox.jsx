import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ messagesBox: { messages } }) => ({ messages });

class MessagesBox extends React.Component {
  renderMessagesList() {
    const { messages } = this.props;
    return messages.map((m) => <div key={m.id}><b>{m.nickname}: </b>{m.text}</div>);
  }

  render() {
    return (
      <div id="currentChat" className="border h-100 mb-3 p-3 rounded-lg" >{this.renderMessagesList()}</div>
    );
  }
}

export default connect(mapStateToProps)(MessagesBox);
