import * as yup from 'yup';
import i18n from 'i18next';
import _ from 'lodash';
import { successIcon, spinner } from '../icons';

// --------------------Validtion for modal windows--------------------
export const getSchema = (inputName) => yup.object().shape({
  [inputName]: yup.string()
    .required(i18n.t('yupModalErrors.required'))
    .min(3, i18n.t('yupModalErrors.min'))
    .trim(),
});
// ----------------------Button for modal windows----------------------
export const getButtonFilling = ({ status, type }) => {
  switch (status) {
    case 'requesting':
      return spinner;
    case 'success':
      return successIcon;
    default:
      return i18n.t(`modals.${type}.confirmButton`);
  }
};
// ----------------------Input description text----------------------
export const getInfoText = (props) => {
  const {
    status, type, errors, channelData,
  } = props;
  const channelName = channelData && channelData.name;
  switch (status) {
    case 'failed':
      return _.capitalize(errors);
    case 'requesting':
      return i18n.t(`modals.${type}.messages.requesting`);
    case 'success':
      return i18n.t(`modals.${type}.messages.success`);
    default:
      return i18n.t(`modals.${type}.messages.default`, { channelName });
  }
};
