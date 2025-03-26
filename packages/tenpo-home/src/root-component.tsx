import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RootRouter from './root-router';

export default function Root() {
  return (
    <StrictMode>
      <BrowserRouter basename="/home">
        <RootRouter />
      </BrowserRouter>
    </StrictMode>
  );
}
