import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { renameChannelIcon, removeChannelIcon } from './icons';
import { changeCurrentChannel, openRenameModal, openRemoveModal } from '../slices';

const mapStateToProps = ({ channelsBox: { channels, currentChannelId } }) => (
  { channels, currentChannelId }
);
const actionCreators = { changeCurrentChannel, openRenameModal, openRemoveModal };

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

const renderChannelsList = (props) => {
  const {
    channels,
    currentChannelId,
    changeCurrentChannel: selectСhannel,
    openRenameModal: openRenameWindow,
    openRemoveModal: openRemoveWindow,
  } = props;

  const handleClickChannel = (id) => (event) => {
    event.preventDefault();
    selectСhannel({ id });
  };
  // ------------------------------------------------------------------------
  const channelControlButtons = (channelId) => {
    const handleClickRename = (id) => (event) => {
      event.preventDefault();
      openRenameWindow({ id });
    };
    const handleClickRemove = (id) => (event) => {
      event.preventDefault();
      openRemoveWindow({ id });
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

export default connect(mapStateToProps, actionCreators)(renderChannelsList);
