import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import getSchema from './utilits';
import routes from '../../routes';
import { closeModal } from '../../slices/modalSlice';

const createChannel = ({ onHide }) => async ({ channelName }, { setSubmitting, setErrors }) => {
  const attributes = { name: channelName.trim() };
  try {
    const url = routes.channelsPath();
    await axios.post(url, { data: { attributes } });
    setSubmitting(false);
    onHide();
  } catch (error) {
    setErrors({ channelName: error.message });
    setSubmitting(false);
  }
};

const Create = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onHide = () => dispatch(closeModal());
  // ------------------------------Formik------------------------------
  const inputRef = useRef('');
  const formik = useFormik({
    initialValues: {
      channelName: inputRef.current,
    },
    validationSchema: getSchema('channelName'),
    onSubmit: createChannel({ onHide }),
    onReset: () => onHide(),
  });
  const formikError = formik.errors.channelName;

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // ------------------------------Classes------------------------------
  const inputClasses = cn({
    'mt-1': true,
    'form-control': true,
    'is-invalid': formikError,
  });

  const textClasses = cn({
    'text-danger': formikError,
  });
  // ------------------------------------------------------------------------
  return (
    <Modal show onHide={formik.handleReset} centered>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header>
          <Modal.Title>{t('modals.create.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <input
            ref={inputRef}
            id="channelName"
            name="channelName"
            type="text"
            className={inputClasses}
            onChange={formik.handleChange}
            value={formik.values.channelName}
            placeholder={t('modals.create.placeholder')}
          />
          <label htmlFor="channelName" className={textClasses}>
            {
            (formikError && _.capitalize(formikError))
            || t('modals.create.messages')
            }
          </label>
          <div className="align-self-end mt-3">
            <Button
              onClick={formik.handleReset}
              type="button"
              variant="secondary"
              className="m-1"
            >
              {t('cancelButton')}
            </Button>
            <Button
              type="submit"
              disabled={formikError}
              className="m-1 btn-primary"
            >
              {t('modals.create.confirmButton')}
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default Create;
