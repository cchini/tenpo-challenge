import { StrictMode } from 'react';
import { useTranslation } from 'react-i18next';

export default function Root() {
  const { t } = useTranslation();
  return (
    <StrictMode>
      <div>Header</div>
      <div>{t('header.title')}</div>
    </StrictMode>
  );
}
