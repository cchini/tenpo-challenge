import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@tenpo/ui';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import css from './permission.module.scss';

const PermissionDenied = () => {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <motion.div
        className={css.lockIcon}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Lock size={60} />
      </motion.div>

      <h1 className={css.title}>{t('access-denied.title')}</h1>
      <p className={css.message}>{t('access-denied.description')}</p>
      <Button
        variant="ghost"
        className={css.button}
        onClick={() => {
          window.history.replaceState(
            {},
            document.title,
            `${window.location.origin}/login`,
          );
        }}
      >
        {t('access-denied.go-home')}
      </Button>
    </div>
  );
};

export default PermissionDenied;
