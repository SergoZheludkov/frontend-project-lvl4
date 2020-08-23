import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MessageInput from './MessageInput';
import ChannelsList from './ChannelsList';

export default class App extends React.Component {
  render() {
    const { serverData } = this.props;
    return (
        <Row className="h-100 pb-5" >
          <Col className="flex-column border-right" sm={3}>
            <div className="d-flex justify-content-between">
              <div>Channels</div>
              <div>+</div>
            </div>
            <div className="mt-3">
              <ChannelsList serverData={serverData} />
            </div>
          </Col>
          <Col sm={9} className="flex-column pb-5">
            <div id="currentChat" className="border h-100 mb-3 rounded-lg" ></div>
            <MessageInput />
          </Col>
        </Row>
    );
  }
}
