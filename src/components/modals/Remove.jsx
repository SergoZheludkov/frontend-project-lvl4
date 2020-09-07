import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Modal, Button } from 'react-bootstrap';
import { createSelector } from 'reselect';
import _ from 'lodash';
import { successIcon, spinner } from '../icons';
import { closeModal, getTheOperation } from '../../slices';

const getInfoText = (status, errors, channelData) => {
  switch (status) {
    case 'failed':
      return _.capitalize(errors);
    case 'requesting':
      return 'Wait a moment. Channel removing...';
    case 'success':
      return 'Congratulations. Channel removed!';
    default:
      return `Do you want to remove the "${channelData && channelData.name}" channel?
      All messages will be removed too`;
  }
};

const getButtonFilling = (status) => {
  switch (status) {
    case 'requesting':
      return spinner;
    case 'success':
      return successIcon;
    default:
      return 'Remove';
  }
};
// ------------------------------------------------------------------------
const getChannels = (state) => state.channelsBox.channels;
const getSelectedChannelId = (state) => state.modalWindows.channelId;

const getCurrentChannelMessages = createSelector(
  getChannels,
  getSelectedChannelId,
  (channels, selectedChannelId) => _.find(channels, { id: selectedChannelId }),
);
// ------------------------------------------------------------------------
const mapStateToProps = (state) => ({
  type: state.modalWindows.type,
  status: state.modalWindows.status,
  errors: state.modalWindows.errors,
  channelData: getCurrentChannelMessages(state),
});
const actionCreators = { closeModal, getTheOperation };

const Remove = (props) => {
  const {
    type,
    channelData,
    status,
    errors: networkErrors,
    closeModal: closeModalWindow,
    getTheOperation: getOperation,
  } = props;
  if (type !== 'remove') return null;

  const handleReset = (event) => {
    event.preventDefault();
    closeModalWindow();
  };
  const handleRemove = (event) => {
    event.preventDefault();
    getOperation('remove', { channelId: channelData.id });
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
          <Modal.Title>Remove the channel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <div className={textClasses}>
            {getInfoText(status, networkErrors, channelData)}
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
            {getButtonFilling(status)}
          </Button>
          </div>
        </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(Remove);
