import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { createChannelIcon } from './icons';
import { openCreateModal } from '../slices';

const actionCreators = { openCreateModal };

const createIconTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Create channel
  </Tooltip>
);

const ChannelsControl = (props) => {
  const { openCreateModal: openModalWindow } = props;

  const handleClickAdd = (event) => {
    event.preventDefault();
    openModalWindow();
  };

  return (
    <div className="d-flex justify-content-between">
      <div>Channels</div>
      <div onClick={handleClickAdd}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={createIconTooltip}
        >
          {createChannelIcon}
        </OverlayTrigger>
      </div>
   </div>
  );
};

export default connect(null, actionCreators)(ChannelsControl);
