import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders HuddlUp text', () => {
  render(<App />);
  expect(screen.getByText(/HuddlUp/i)).toBeVisible();
});
