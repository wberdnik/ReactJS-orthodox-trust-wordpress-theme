import React from 'react';
import { render } from '@testing-library/react';
import App_withRedux from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App_withRedux />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
