import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const MessageInput = () => (
  <InputGroup className="mb-3">
    <FormControl placeholder="Input your message"/>
    <InputGroup.Append>
      <Button variant="outline-secondary">Send</Button>
    </InputGroup.Append>
  </InputGroup>
);

export default MessageInput;
