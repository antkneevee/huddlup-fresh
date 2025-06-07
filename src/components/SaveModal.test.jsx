import { render, fireEvent, screen } from '@testing-library/react';
import SaveModal from './SaveModal';

test('SaveModal calls onClose', () => {
  const onClose = jest.fn();
  render(<SaveModal onClose={onClose} />);
  fireEvent.click(screen.getByText('OK'));
  expect(onClose).toHaveBeenCalled();
});
