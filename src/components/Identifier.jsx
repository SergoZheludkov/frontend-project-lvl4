import React from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import * as yup from 'yup';
import { Modal, Button, Spinner } from 'react-bootstrap';

// ------------------------------------------------------------------------
const spinner = (
  <Spinner
    as="span"
    animation="border"
    size="sm"
    role="status"
    aria-hidden="true"
    className="mr-2"
  />
);

const Identifier = () => {
  const schema = yup.object().shape({
    nickname: yup.string()
      .required()
      .min(3)
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      nickname: '',
      disabled: false,
    },
    validationSchema: schema,
    onSubmit: ({ nickname }) => {
      formik.setValues({ disabled: true, nickname });
      Cookies.set('nickname', nickname, { expires: 1 });
      window.location.reload();
    },
  });
  const error = formik.errors.nickname;

  const inputClasses = cn({
    'form-control': true,
    'is-invalid': error,
  });

  return (
    <Modal show centered>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header>
          <Modal.Title>Enter your nickname to use the chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            id="nickname"
            name="nickname"
            type="text"
            className={inputClasses}
            onChange={formik.handleChange}
            value={formik.values.nickname}
            placeholder="Nickname"
          />
          {error && <div>{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" disabled={error || formik.values.disabled} variant="primary">
            {formik.values.disabled && spinner}
            {formik.values.disabled ? 'Loading...' : 'Confirm'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Identifier;
