import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import { successIcon, spinner } from '../icons';
import { createChannel, closeModal } from '../../slices';

const getInfoText = (status, errors) => {
  switch (status) {
    case 'failed':
      return _.capitalize(errors);
    case 'requesting':
      return 'Wait a moment. Channel creating...';
    case 'success':
      return 'Congratulations. Channel created!';
    default:
      return 'Enter the name of the new channel';
  }
};

const getButtonFilling = (status) => {
  switch (status) {
    case 'requesting':
      return spinner;
    case 'success':
      return successIcon;
    default:
      return 'Create';
  }
};
// ------------------------------------------------------------------------
const mapStateToProps = ({ modalWindows: { type, status, errors } }) => ({ type, status, errors });
const actionCreators = { closeModal, createChannel };

const Create = (props) => {
  const {
    type,
    status,
    errors: networkErrors,
    closeModal: closeModalWindow,
    createChannel: createNewChannel,
  } = props;
  if (type !== 'create') return null;
  // ------------------------------Formik------------------------------
  const schema = yup.object().shape({
    channelName: yup.string()
      .required()
      .min(3)
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: schema,
    onSubmit: ({ channelName }) => {
      createNewChannel({ name: channelName.trim() });
    },
    onReset: () => {
      closeModalWindow();
    },
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
          <Modal.Title>Create channel</Modal.Title>
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

export default connect(mapStateToProps, actionCreators)(Create);
