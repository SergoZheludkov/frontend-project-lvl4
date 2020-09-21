import React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { createChannelIcon } from './icons';
import { openModal } from '../slices';

const createIconTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Create channel
  </Tooltip>
);

const ChannelsControl = () => {
  const dispatch = useDispatch();

  const handleClickAdd = () => {
    dispatch(openModal({ type: 'create', channelId: null }));
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

export default ChannelsControl;
