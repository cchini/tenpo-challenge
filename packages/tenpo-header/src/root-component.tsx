import { StrictMode } from 'react';
import { useTranslation } from 'react-i18next';
import { identity } from '@tenpo/services';

export default function Root() {
  const { t } = useTranslation();

  const handleOnClick = () => {
    identity.logout();
  };

  return (
    <StrictMode>
      <div>Header</div>
      <div>{t('header.title')}</div>
      <button onClick={handleOnClick}>Cerrar sesión</button>
    </StrictMode>
  );
}
