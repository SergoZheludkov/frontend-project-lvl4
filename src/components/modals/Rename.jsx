import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import { successIcon, spinner } from '../icons';
import { closeModal, getTheOperation } from '../../slices';
import { currentChannelDataSelector } from '../../selectors';

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
const Rename = () => {
  const type = useSelector(({ modalWindows }) => modalWindows.type);
  const status = useSelector(({ modalWindows }) => modalWindows.status);
  const networkErrors = useSelector(({ modalWindows }) => modalWindows.errors);
  const channelData = useSelector(currentChannelDataSelector);
  const dispatch = useDispatch();

  if (type !== 'rename') return null;
  // ------------------------------Formik------------------------------
  const inputRef = useRef(channelData.name);
  const schema = yup.object().shape({
    channelName: yup.string()
      .required()
      .min(3)
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      channelName: inputRef.current,
    },
    validationSchema: schema,
    onSubmit: ({ channelName }) => {
      const attributes = { name: channelName.trim() };
      const channelId = channelData.id;
      dispatch(getTheOperation('rename', { attributes, channelId }));
    },
    onReset: () => dispatch(closeModal()),
  });
  const formikError = formik.errors.channelName;

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);
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
            ref={inputRef}
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

export default Rename;
