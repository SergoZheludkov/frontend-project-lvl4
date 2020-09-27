import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import { currentChannelDataSelector } from '../../selectors';
import getSchema from './utilits';
import routes from '../../routes';
import { closeModal } from '../../slices/modalSlice';

const renameChannel = (props) => async ({ channelName }, { setSubmitting, setErrors }) => {
  const { onHide, channelId } = props;
  const attributes = { name: channelName.trim() };
  try {
    const url = routes.channelPath(channelId);
    await axios.patch(url, { data: { attributes } });
    setSubmitting(false);
    onHide();
  } catch (error) {
    setErrors({ channelName: error.message });
    setSubmitting(false);
  }
};

const Rename = () => {
  const channelData = useSelector(currentChannelDataSelector);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onHide = () => dispatch(closeModal());
  // ------------------------------Formik------------------------------
  const inputRef = useRef(channelData.name);

  const formik = useFormik({
    initialValues: {
      channelName: inputRef.current,
    },
    validationSchema: getSchema('channelName'),
    onSubmit: renameChannel({ onHide, channelId: channelData.id }),
    onReset: () => onHide(),
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
            value={formik.values.channelName}
            placeholder={t('modals.rename.placeholder')}
          />
          <label htmlFor="channelName" className={textClasses}>
            {
            (formikError && _.capitalize(formikError))
            || t('modals.rename.messages')
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
              {t('modals.rename.confirmButton')}
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default Rename;
