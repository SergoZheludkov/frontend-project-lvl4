import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { renameChannelIcon, removeChannelIcon } from './icons';
import { changeCurrentChannel, openModal } from '../slices';

const renameIconTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Rename channel
  </Tooltip>
);

const removeIconTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Remove channel
  </Tooltip>
);

const renderChannelsList = () => {
  const channels = useSelector((state) => state.channelsBox.channels);
  const currentChannelId = useSelector((state) => state.channelsBox.currentChannelId);
  const dispatch = useDispatch();

  const handleClickChannel = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
  };
  // ------------------------------------------------------------------------
  const channelControlButtons = (channelId) => {
    const handleClickRename = (id) => () => {
      dispatch(openModal({ type: 'rename', channelId: id }));
    };
    const handleClickRemove = (id) => () => {
      dispatch(openModal({ type: 'remove', channelId: id }));
    };
    return (
      <div className="d-flex">
        <div onClick={handleClickRename(channelId)}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renameIconTooltip}
          >
            {renameChannelIcon}
          </OverlayTrigger>
        </div>
        <div onClick={handleClickRemove(channelId)}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={removeIconTooltip}
          >
            {removeChannelIcon}
          </OverlayTrigger>
        </div>
      </div>
    );
  };
  // ------------------------------------------------------------------------
  const ListItems = channels.map(({ id, name, removable }) => (
    <ListGroup.Item
      as="button"
      key={id}
      active={id === currentChannelId}
      action
      className="text-left d-flex justify-content-between"
    >
      <div onClick={handleClickChannel(id)} className="flex-grow-1">
        {name}
      </div>
      {removable ? channelControlButtons(id) : null}
    </ListGroup.Item>
  ));

  return (
    <div className="mt-3">
      <ListGroup as="ul">
        {ListItems}
      </ListGroup>
    </div>
  );
};

export default renderChannelsList;
