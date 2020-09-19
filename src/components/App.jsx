import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChannelsControl from './ChannelsControl';
import ChannelsList from './ChannelsList';
import MessageInput from './MessageInput';
import MessagesBox from './MessagesBox';
import Modal from './Modal';
import Context from '../context';

import { openModal } from '../slices';

const actionCreators = { openModal };

const App = (props) => {
  const { openModal: openModalWindow } = props;
  const { nickname } = useContext(Context);
  if (!nickname) openModalWindow({ type: 'identification', channelId: null });

  return (
    <Row className="h-100 pb-5 overflow-auto" >
      <Modal />
      <Col className="flex-column overflow-auto h-auto mh-100" sm={3}>
        <ChannelsControl />
        <ChannelsList />
      </Col>
      <Col sm={9} className="flex-column h-100 pb-5">
        <MessagesBox />
        <MessageInput />
      </Col>
    </Row>
  );
};

export default connect(null, actionCreators)(App);
