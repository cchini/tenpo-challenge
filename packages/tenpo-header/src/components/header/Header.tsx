import { useState, memo } from 'react';
import { Icon } from '@tenpo/ui';
import type { AccountState } from '@tenpo/states';
import Menu from '../menu/Menu';
import tenpoImg from '../../../src/assets/images/tenpo-blanco.png';
import scss from './header.module.scss';

interface HeaderProps {
  /** User account state containing user information */
  user: AccountState;
}

/**
 * Header component that displays the Tenpo logo and a user avatar.
 * When the avatar is clicked, a dropdown menu appears with user-related options.
 *
 * This component is wrapped with React.memo to optimize performance by preventing unnecessary re-renders.
 */
const Header = memo(({ user }: HeaderProps) => {
  /** State to control the visibility of the user menu */
  const [showMenuUser, setShowMenuUser] = useState<boolean>(false);

  return (
    <header className={scss.tenpoHeader}>
      {/* Tenpo logo */}
      <figure className={scss.tenpoHeader_logo}>
        <img
          className={scss.tenpoHeader_logo__img}
          decoding="async"
          width="100"
          src={tenpoImg}
          alt="Tenpo"
          title="Tenpo"
        />
      </figure>

      {/* User avatar button to toggle the menu */}
      <button
        type="button"
        className={scss.tenpoHeader_avatar}
        onClick={() => setShowMenuUser(!showMenuUser)}
      >
        <div className={scss.content}>
          <Icon name="user-fill" />
        </div>
      </button>

      {/* User menu dropdown */}
      {showMenuUser && <Menu user={user} />}
    </header>
  );
});

/**
 * Optimized version of the Header component using React.memo.
 * It only re-renders when the `user` prop changes.
 */
export default memo(Header, (prevProps, nextProps) => {
  return prevProps.user === nextProps.user;
});
