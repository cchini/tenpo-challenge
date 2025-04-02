import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { Button } from '@tenpo/ui';
import { setLocaleUser, type AccountState } from '@tenpo/states';
import { identity } from '@tenpo/services';
import scss from './menu.module.scss';

interface MenuUserProps {
  /** User account state containing user information */
  user: AccountState;
}

/**
 * MenuUser component displays a user menu with user details,
 * language selection, and a logout button.
 *
 * This component is wrapped with React.memo to optimize performance
 * by preventing unnecessary re-renders when the `user` prop remains unchanged.
 */
const MenuUser = ({ user }: MenuUserProps) => {
  const { t: translation } = useTranslation();

  return (
    <section className={scss.menu}>
      <div className={scss.menu_header}>
        {/* Display user's name */}
        <p className={cx(scss.menu_header, scss.menu_header__bold)}>
          {user?.usename}
        </p>
        {/* Display user's email */}
        <p className={cx(scss.menu_header)}>{user?.email}</p>
        <div className={cx(scss.menu_header, scss.menu_header__divider)} />

        {/* Language selection */}
        <p className={cx(scss.menu_header, scss.locale)}>
          <a
            className={cx(scss.locale__link)}
            onClick={() => setLocaleUser('es')}
          >
            ES
          </a>{' '}
          |{' '}
          <a
            className={cx(scss.locale__link)}
            onClick={() => setLocaleUser('en')}
          >
            EN
          </a>
        </p>
        <div className={cx(scss.menu_header, scss.menu_header__divider)} />
      </div>

      {/* Logout button */}
      <div className={scss.menu_logout}>
        <Button
          className={cx(scss.menu_logout_button)}
          onClick={() => identity.logout()}
        >
          {translation('header.logout-button')}
        </Button>
      </div>
    </section>
  );
};

/**
 * Optimized version of the MenuUser component using React.memo.
 * It only re-renders when the `user` prop changes.
 */
export default memo(MenuUser, (prevProps, nextProps) => {
  return prevProps.user === nextProps.user;
});
