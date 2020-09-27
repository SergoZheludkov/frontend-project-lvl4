import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import _ from 'lodash';
import getSchema from './utilits';

const days = 5;
const setNickname = (nickname) => {
  Cookies.set('nickname', nickname, { expires: days });
  window.location.reload();
};

const Identifier = () => {
  const { t } = useTranslation();
  // ------------------------------Formik------------------------------
  const nicknameRef = useRef('');

  const formik = useFormik({
    initialValues: {
      nickname: nicknameRef.current,
    },
    validationSchema: getSchema('nickname'),
    onSubmit: ({ nickname }) => {
      setNickname(nickname.trim());
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

  const textClasses = cn({
    'text-danger': formikError,
  });
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
            value={formik.values.nickname}
            placeholder={t('modals.identifier.placeholder')}
          />
          <label htmlFor="nickname" className={textClasses}>
            {(formikError && <div>{_.capitalize(formikError)}</div>) || t('modals.identifier.messages')}
          </label>
          <div className="align-self-end mt-3">
            <Button
              type="submit"
              disabled={formikError}
              className="m-1 btn-primary"
            >
              {t('modals.identifier.confirmButton')}
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default Identifier;
