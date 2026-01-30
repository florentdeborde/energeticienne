import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const fallbackLang = "fr";
  const supportedLanguages = ["en", "fr"];
  const currentLanguage = supportedLanguages.includes(i18n.language.split('-')[0]) ? i18n.language.split('-')[0] : fallbackLang;
  const nextLanguages = supportedLanguages.filter(lang => lang !== currentLanguage);

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    setIsHovered(false);
  };

  return (
    <div
      className={`language-switcher${isHovered ? " expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <>
          {nextLanguages.map(lang => (
            <div key={lang} className="language-option" onClick={() => changeLanguage(lang)}>
              <img src={`/images/core/flag/${lang}.png`} alt={`${lang}-flag`} />
              <span>{lang.toUpperCase()}</span>
            </div>
          ))}
        </>
      )}
      <div className="language-option">
        <img src={`/images/core/flag/${currentLanguage}.png`} alt="current-language" />
        <span>{currentLanguage.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default LanguageSelector;