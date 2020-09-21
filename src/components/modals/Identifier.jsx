import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import _ from 'lodash';
import { getTheOperation } from '../../slices';
import { getSchema, getButtonFilling } from './utilits';

const Identifier = () => {
  const status = useSelector(({ modalWindows }) => modalWindows.status);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // ------------------------------Formik------------------------------
  const nicknameRef = useRef('');

  const formik = useFormik({
    initialValues: {
      nickname: nicknameRef.current,
    },
    validationSchema: getSchema('nickname'),
    onSubmit: ({ nickname }) => {
      dispatch(getTheOperation('setNick', { nickname: nickname.trim(), setCookie: Cookies.set }));
    },
  });
  const formikError = formik.errors.nickname;

  useEffect(() => {
    nicknameRef.current.focus();
  }, []);
  // ------------------------------Classes------------------------------
  const inputClasses = cn({
    'mt-1': true,
    'form-control': true,
    'is-invalid': formikError,
  });

  const buttonClasses = cn({
    'btn-primary': status !== 'success',
    'btn-success': status === 'success',
  });

  const textClasses = cn({
    'text-danger': formikError,
  });
  // ----------------------------------------------------------------------
  const inputDisabled = status === 'requesting' || status === 'success';
  const btnDisabled = formikError || status !== 'none';
  // ----------------------------------------------------------------------
  return (
    <Modal show centered>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header>
          <Modal.Title>{t('modals.identifier.header')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <input
            ref={nicknameRef}
            id="nickname"
            name="nickname"
            type="text"
            className={inputClasses}
            onChange={formik.handleChange}
            disabled={inputDisabled}
            value={formik.values.nickname}
            placeholder={t('modals.identifier.placeholder')}
          />
          <label htmlFor="nickname" className={textClasses}>
            {(formikError && <div>{_.capitalize(formikError)}</div>) || t('modals.identifier.messages.default')}
          </label>
          <div className="align-self-end mt-3">
            <Button
              type="submit"
              disabled={btnDisabled}
              className={buttonClasses}
            >
              {getButtonFilling({ status, type: 'identifier' })}
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default Identifier;
