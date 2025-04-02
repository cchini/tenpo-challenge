import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { User } from '@tenpo/services';
import css from './table.module.scss';

interface TableProps {
  users: User[];
}

/**
 * A memoized table component that displays a list of users.
 * It optimizes performance by using `React.memo` and `useMemo`
 * to prevent unnecessary re-renders when the user list remains unchanged.
 *
 * @param {TableProps} props - The component props.
 * @param {User[]} props.users - An array of user objects to display in the table.
 * @returns {JSX.Element} A table displaying user information.
 */
const Table = memo(({ users }: TableProps) => {
  const { t } = useTranslation();

  /**
   * Generates memoized table rows to avoid re-rendering when the `users` prop remains unchanged.
   */
  const tableRows = useMemo(
    () =>
      users.map(({ id, name, email, location, picture }) => (
        <tr key={id?.value || email}>
          <td>{`${name.first} ${name.last}`}</td>
          <td>{email}</td>
          <td>{location.country}</td>
          <td className={css.tableList__avatar}>
            <img
              src={picture.thumbnail}
              alt={`${name.first} ${name.last}`}
              loading="lazy"
            />
          </td>
        </tr>
      )),
    [users],
  );

  return (
    <table className={css.tableList}>
      <thead>
        <tr>
          <th>{t('home.list.table-header-name')}</th>
          <th>{t('home.list.table-header-email')}</th>
          <th>{t('home.list.table-header-country')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
});

export default Table;
