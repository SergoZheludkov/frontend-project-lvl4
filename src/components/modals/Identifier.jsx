import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import _ from 'lodash';
import { successIcon, spinner } from '../icons';
import { getTheOperation } from '../../slices';

const getButtonFilling = (status) => {
  switch (status) {
    case 'requesting':
      return spinner;
    case 'success':
      return successIcon;
    default:
      return 'Confirm';
  }
};
// ------------------------------------------------------------------------
const Identifier = () => {
  const type = useSelector(({ modalWindows }) => modalWindows.type);
  const status = useSelector(({ modalWindows }) => modalWindows.status);
  const dispatch = useDispatch();
  if (type !== 'identification') return null;
  // ------------------------------Formik------------------------------
  const nicknameRef = useRef('');
  const schema = yup.object().shape({
    nickname: yup.string()
      .required()
      .min(3)
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      nickname: nicknameRef.current,
    },
    validationSchema: schema,
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
          <Modal.Title>Identification</Modal.Title>
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
            placeholder="Nickname"
          />
          <div className={textClasses}>
            {(formikError && <div>{_.capitalize(formikError)}</div>) || 'Enter your nickname to use the chat'}
          </div>
          <div className="align-self-end mt-3">
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

export default Identifier;
