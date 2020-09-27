import * as yup from 'yup';
import i18n from 'i18next';

// --------------------Validtion for modal windows--------------------
const getSchema = (inputName) => yup.object().shape({
  [inputName]: yup.string()
    .required(i18n.t('yupModalErrors.required'))
    .min(3, i18n.t('yupModalErrors.min'))
    .trim(),
});
export default getSchema;
