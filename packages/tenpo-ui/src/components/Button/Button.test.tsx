/**
 *  @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { describe, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('tenpo-ui/Button', () => {
  it('should render correctly', () => {
    render(<Button>Hello</Button>);
    const heading = screen.getByRole('button');
    expect(heading).toBeInTheDocument();
  });
});
