import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import { currentChannelDataSelector } from '../../selectors';
import routes from '../../routes';
import { closeModal } from '../../slices/modalSlice';

const removeChannel = async (props) => {
  const { onHide, setError, channelId } = props;
  try {
    const url = routes.channelPath(channelId);
    await axios.delete(url);
    onHide();
  } catch (error) {
    setError({ channelName: error.message });
  }
};

const Remove = () => {
  const channelData = useSelector(currentChannelDataSelector);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onHide = () => dispatch(closeModal());

  const handleRemove = () => {
    removeChannel({ onHide, setError, channelId: channelData.id });
  };
  // ------------------------------Classes------------------------------
  const textClasses = cn({
    'mb-2': true,
    'text-danger': error,
  });
  // ------------------------------------------------------------------------
  const channelName = channelData ? channelData.name : '';
  return (
    <Modal show onHide={onHide} centered>
        <Modal.Header>
          <Modal.Title>{t('modals.remove.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <div className={textClasses}>
            {
              (error && _.capitalize(error))
              || t('modals.remove.messages', { channelName })
            }
          </div>
          <div className="align-self-end">
          <Button
            onClick={onHide}
            type="button"
            className="m-1"
          >
            {t('cancelButton')}
          </Button>
          <Button
            onClick={handleRemove}
            type="submit"
            className="m-1 btn-danger"
          >
            {t('modals.remove.confirmButton')}
          </Button>
          </div>
        </Modal.Body>
    </Modal>
  );
};

export default Remove;
