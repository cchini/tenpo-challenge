import { memo } from 'react';
import type { UserList } from '@tenpo/services';
import scss from './cardList.module.scss';

/**
 * CardList Component
 *
 * This component displays a list of user cards based on the provided `users` data.
 * Each card contains the user's name, email, country, and profile picture.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {UserList} props.users - An array of user objects to be displayed
 * @returns {JSX.Element} A list of user cards
 */
const CardList = memo(({ users }: { users: UserList }) => {
  return (
    <>
      {users?.map((user) => (
        <div key={user?.id?.value} className={scss.cardList}>
          {/* User information */}
          <div className={scss.cardList_info}>
            <p>
              <strong>
                {user.name.first} {user.name.last}
              </strong>
            </p>
            <p>{user.email}</p>
            <p>{user?.location?.country}</p>
          </div>

          {/* User avatar */}
          <div>
            <figure className={scss.cardList_avatar}>
              <img
                className={scss.content}
                decoding="async"
                loading="lazy"
                width="100"
                src={user.picture.thumbnail}
                alt={`${user.name.first} ${user.name.last} avatar`}
                title={`${user.name.first} ${user.name.last}`}
              />
            </figure>
          </div>
        </div>
      ))}
    </>
  );
});

export default CardList;
