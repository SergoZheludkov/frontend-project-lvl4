import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import i18n from '../i18n';
import { changeCurrentLanguage } from '../slices';

const LanguageControlButtons = () => {
  const translations = useSelector((state) => state.language.translations);
  const currentLang = useSelector((state) => state.language.current);
  const dispatch = useDispatch();
  const handleChangeLang = (lang) => () => {
    dispatch(changeCurrentLanguage({ lang }));
    i18n.changeLanguage(lang);
  };

  const buttons = translations.map((lang) => (
    <Button
      key={lang}
      onClick={handleChangeLang(lang)}
      className={lang === currentLang && 'active'}
    >
      {lang.toUpperCase()}
    </Button>
  ));
  return buttons;
};

export default LanguageControlButtons;
