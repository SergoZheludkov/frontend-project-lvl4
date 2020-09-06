import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Spinner } from 'react-bootstrap';
import { addMessage } from '../slices';
import Context from './Context';

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

const mapStateToProps = ({
  messageInput: { sendedState, error },
  channelsBox: { currentChannelId },
}) => ({ currentChannelId, sendedState, error });

const actionCreators = {
  addMessage,
};

const Input = (props) => {
  const { currentChannelId, sendedState, addMessage: sendMessage } = props;
  const { nickname } = useContext(Context);

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
    onSubmit: ({ message }) => {
      sendMessage({ nickname, text: message }, currentChannelId);
      formik.setValues({ message: '' });
    },
  });

  const requesting = sendedState === 'requesting';
  const variant = requesting ? 'outline-secondary' : 'outline-primary';
  return (
    <form className="d-flex" onSubmit={formik.handleSubmit}>
      <input
        id="message"
        name="message"
        type="text"
        className="form-control"
        onChange={formik.handleChange}
        disabled={requesting}
        value={formik.values.message}
        placeholder="Input your message"
      />
      <Button type="submit" disabled={requesting} variant={variant}>
          {requesting ? spinner : 'Send'}
      </Button>
    </form>
  );
};

export default connect(mapStateToProps, actionCreators)(Input);
