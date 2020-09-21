import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import Context from '../context';
import routes from '../routes';

const spinner = (
  <Spinner
    as="span"
    animation="border"
    size="sm"
    role="status"
    aria-hidden="true"
    className="mx-2"
  />
);

const addMessage = (props) => async ({ message }, { setSubmitting, setErrors, resetForm }) => {
  const { currentChannelId, nickname } = props;
  const attributes = { nickname, text: message };
  try {
    const url = routes.channelMessagesPath(currentChannelId);
    await axios.post(url, { data: { attributes } });
    setSubmitting(false);
    resetForm();
  } catch (error) {
    setErrors({ message: error.message });
    setSubmitting(false);
  }
};

const Input = () => {
  const currentChannelId = useSelector((state) => state.channelsBox.currentChannelId);
  const { nickname } = useContext(Context);
  const { t } = useTranslation();

  const schema = yup.object().shape({
    message: yup.string()
      .required()
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: schema,
    onSubmit: addMessage({ currentChannelId, nickname }),
  });

  const variant = formik.isSubmitting ? 'outline-secondary' : 'outline-primary';
  return (
    <form className="d-flex" onSubmit={formik.handleSubmit}>
      <input
        id="message"
        name="message"
        type="text"
        className="form-control"
        onChange={formik.handleChange}
        disabled={formik.isSubmitting}
        value={formik.values.message}
        placeholder={t('messageInput.placeholder')}
      />
      <Button type="submit" disabled={formik.isSubmitting} variant={variant}>
          {formik.isSubmitting ? spinner : t('messageInput.sendButton')}
      </Button>
    </form>
  );
};

export default Input;
