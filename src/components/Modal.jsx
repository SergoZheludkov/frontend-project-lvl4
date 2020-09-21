import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './modals';

const Modal = () => {
  const type = useSelector((state) => state.modalWindows.type);
  if (!type) return null;
  const CurrentModal = getModal(type);
  return <CurrentModal />;
};
export default Modal;
