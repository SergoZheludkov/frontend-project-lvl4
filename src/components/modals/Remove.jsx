import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Modal, Button } from 'react-bootstrap';
import { closeModal, getTheOperation } from '../../slices';
import { currentChannelDataSelector } from '../../selectors';
import { getInfoText, getButtonFilling } from './utilits';

const Remove = () => {
  const status = useSelector(({ modalWindows }) => modalWindows.status);
  const networkErrors = useSelector(({ modalWindows }) => modalWindows.errors);
  const channelData = useSelector(currentChannelDataSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleReset = () => {
    dispatch(closeModal());
  };
  const handleRemove = () => {
    dispatch(getTheOperation('remove', { channelId: channelData.id }));
  };
  // ------------------------------Classes------------------------------
  const buttonClasses = cn({
    'm-1': true,
    'btn-danger': status !== 'success',
    'btn-success': status === 'success',
  });

  const textClasses = cn({
    'mb-2': true,
    'text-danger': networkErrors,
    'text-info': status === 'requesting',
    'text-success': status === 'success',
  });
  // ------------------------------------------------------------------------
  const btnDisabled = networkErrors || status !== 'none';
  // ------------------------------------------------------------------------
  return (
    <Modal show onHide={handleReset} centered>
        <Modal.Header>
          <Modal.Title>{t('modals.remove.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <div className={textClasses}>
            {getInfoText({
              status,
              type: 'remove',
              channelData,
              errors: networkErrors,
            })}
          </div>
          <div className="align-self-end">
          <Button
            onClick={handleReset}
            type="button"
            disabled={status === 'requesting'}
            className="m-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemove}
            type="submit"
            disabled={btnDisabled}
            className={buttonClasses}
          >
            {getButtonFilling({ status, type: 'remove' })}
          </Button>
          </div>
        </Modal.Body>
    </Modal>
  );
};

export default Remove;
