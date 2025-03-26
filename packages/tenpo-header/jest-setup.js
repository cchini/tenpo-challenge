import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

configure({ asyncUtilTimeout: 3000 });

// Mock SystemJS
global.System = {
  import: jest.fn(mockImport),
};
