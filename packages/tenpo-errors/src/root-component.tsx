import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useRouter from './hooks/useRouter';

export default function Root() {
  const router = useRouter();
  return (
    <StrictMode>
      <BrowserRouter basename="/home">
        <Routes>
          {router?.map((value) => (
            <Route
              key={value.path}
              path={value.path}
              element={<value.element />}
            />
          ))}
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename="/">
        <Routes>
          {router?.map((value) => (
            <Route
              key={value.path}
              path={value.path}
              element={<value.element />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
