import { useTranslation } from 'react-i18next';

const AuthenticationError = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>{t('authentication-error.title')}</div>
      <div>{t('authentication-error.description')}</div>
    </div>
  );
};

export default AuthenticationError;
