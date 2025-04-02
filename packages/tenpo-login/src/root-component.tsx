import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';

export default function Root() {
  return (
    <StrictMode>
      <BrowserRouter basename="/">
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/login'} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
