import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import { createSelector } from 'reselect';
import _ from 'lodash';
import { successIcon, spinner } from '../icons';
import { closeModal, getTheOperation } from '../../slices';

const getInfoText = (status, errors) => {
  switch (status) {
    case 'failed':
      return _.capitalize(errors);
    case 'requesting':
      return 'Wait a moment. Channel renaming...';
    case 'success':
      return 'Congratulations. Channel renamed!';
    default:
      return 'Enter a new channel name';
  }
};

const getButtonFilling = (status) => {
  switch (status) {
    case 'requesting':
      return spinner;
    case 'success':
      return successIcon;
    default:
      return 'Rename';
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

const Rename = (props) => {
  const {
    type,
    channelData,
    status,
    errors: networkErrors,
    closeModal: closeModalWindow,
    getTheOperation: getOperation,
  } = props;
  if (type !== 'rename') return null;
  // ------------------------------Formik------------------------------
  const schema = yup.object().shape({
    channelName: yup.string()
      .required()
      .min(3)
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      channelName: channelData.name,
    },
    validationSchema: schema,
    onSubmit: ({ channelName }) => {
      const attributes = { name: channelName.trim() };
      const channelId = channelData.id;
      getOperation('rename', { attributes, channelId });
    },
    onReset: () => closeModalWindow(),
  });
  const formikError = formik.errors.channelName;
  // ------------------------------Classes------------------------------
  const inputClasses = cn({
    'mt-1': true,
    'form-control': true,
    'is-invalid': formikError || networkErrors,
  });

  const buttonClasses = cn({
    'm-1': true,
    'btn-primary': status !== 'success',
    'btn-success': status === 'success',
  });

  const textClasses = cn({
    'text-danger': formikError || networkErrors,
    'text-info': status === 'requesting',
    'text-success': status === 'success',
  });
  // ------------------------------------------------------------------------
  const inputDisabled = status === 'requesting' || status === 'success';
  const btnDisabled = formikError || networkErrors || status !== 'none';
  // ------------------------------------------------------------------------
  return (
    <Modal show onHide={formik.handleReset} centered>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header>
          <Modal.Title>Rename the channel</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <input
            id="channelName"
            name="channelName"
            type="text"
            className={inputClasses}
            onChange={formik.handleChange}
            disabled={inputDisabled}
            value={formik.values.channelName}
            placeholder="Channel name"
          />
          <div className={textClasses}>
            {(formikError && _.capitalize(formikError)) || getInfoText(status, networkErrors)}
          </div>
          <div className="align-self-end mt-3">
            <Button
              onClick={formik.handleReset}
              type="button"
              variant="secondary"
              disabled={status === 'requesting'}
              className="m-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={btnDisabled}
              className={buttonClasses}
            >
              {getButtonFilling(status)}
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(Rename);
