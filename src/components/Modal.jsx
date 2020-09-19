import React from 'react';
import { connect } from 'react-redux';
import getModal from './modals';

const mapStateToProps = (state) => ({
  type: state.modalWindows.type,
});
const Modal = (props) => {
  const { type } = props;
  if (!type) return null;
  const CurrentModal = getModal(type);
  return <CurrentModal />;
};
export default connect(mapStateToProps)(Modal);
