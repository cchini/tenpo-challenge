import { Routes, Route, Navigate } from 'react-router-dom';
import usePermissions from './hooks/usePermissions';
import { getAccountUser } from '@tenpo/states';

/**
 * Root component responsible for handling route permissions based on user roles.
 * It retrieves user permissions, validates them, and renders accessible routes.
 */
export default function Root() {
  const account = getAccountUser();
  const permissions = account?.permissions;
  const values = usePermissions(permissions);
  return (
    <Routes>
      {values?.map((value) => (
        <Route key={value.path} path={value.path} element={<value.element />} />
      ))}
      {/* Redirect any unauthorized access to a permission-denied page */}
      <Route path="*" element={<Navigate to="/permission-denied" />} />
    </Routes>
  );
}
