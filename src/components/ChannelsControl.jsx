import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { OverlayTrigger } from 'react-bootstrap';
import getIconTooltip from './iconTooltip';
import { createChannelIcon } from './icons';
import { openModal } from '../slices';

const ChannelsControl = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClickAdd = () => {
    dispatch(openModal({ type: 'create', channelId: null }));
  };
  const createIconTooltip = getIconTooltip(t('iconsTooltip.create'));
  return (
    <div className="d-flex justify-content-between">
      <div>{t('channelsControl.header')}</div>
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
