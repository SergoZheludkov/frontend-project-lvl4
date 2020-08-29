import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Channels from './Channels';
import MessageInput from './MessageInput';
import MessagesBox from './MessagesBox';

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
              <Channels serverData={serverData} />
            </div>
          </Col>
          <Col sm={9} className="flex-column pb-5">
            <MessagesBox />
            <MessageInput />
          </Col>
        </Row>
    );
  }
}
