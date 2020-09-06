import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChannelsControl from './ChannelsControl';
import ChannelsList from './ChannelsList';
import MessageInput from './MessageInput';
import MessagesBox from './MessagesBox';
import Context from './Context';
import getModal from './modals';
import { openIdentificationModal } from '../slices';

const actionCreators = { openIdentificationModal };

const App = (props) => {
  const { openIdentificationModal: runIdentification } = props;
  const { nickname } = useContext(Context);
  if (!nickname) runIdentification();

  const IdentificationModal = getModal('identification');
  const CreateModal = getModal('create');
  const RenameModal = getModal('rename');
  const Remove = getModal('remove');
  return (
    <Row className="h-100 pb-5" >
      <IdentificationModal />
      <CreateModal />
      <RenameModal />
      <Remove />
      <Col className="flex-column rounded-lg overflow-auto h-auto mh-100" sm={3}>
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
