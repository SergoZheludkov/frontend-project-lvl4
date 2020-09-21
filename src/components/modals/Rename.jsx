import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import { closeModal, getTheOperation } from '../../slices';
import { currentChannelDataSelector } from '../../selectors';
import { getSchema, getInfoText, getButtonFilling } from './utilits';

const Rename = () => {
  const status = useSelector(({ modalWindows }) => modalWindows.status);
  const networkErrors = useSelector(({ modalWindows }) => modalWindows.errors);
  const channelData = useSelector(currentChannelDataSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // ------------------------------Formik------------------------------
  const inputRef = useRef(channelData.name);

  const formik = useFormik({
    initialValues: {
      channelName: inputRef.current,
    },
    validationSchema: getSchema('channelName'),
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
          <Modal.Title>{t('modals.rename.header')}</Modal.Title>
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
            placeholder={t('modals.rename.placeholder')}
          />
          <label htmlFor="channelName" className={textClasses}>
            {
            (formikError && _.capitalize(formikError))
            || getInfoText({ status, type: 'rename', errors: networkErrors })
            }
          </label>
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
              {getButtonFilling({ status, type: 'rename' })}
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default Rename;
