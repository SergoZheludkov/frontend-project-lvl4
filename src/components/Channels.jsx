import React from 'react';
import { ListGroup } from 'react-bootstrap';

const renderChannelsList = ({ serverData: { channels, currentChannelId } }) => {
  const ListItems = channels.map(({ id, name }) => (
    <ListGroup.Item
      key={id}
      as="li"
      active={id === currentChannelId}
      className="text-center"
    >{name}</ListGroup.Item>
  ));

  return (
    <ListGroup as="ul">
     {ListItems}
    </ListGroup>
  );
};

export default renderChannelsList;
