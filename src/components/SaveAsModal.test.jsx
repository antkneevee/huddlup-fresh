import { render, fireEvent, screen } from '@testing-library/react';
import SaveAsModal from './SaveAsModal';

test('SaveAsModal calls callbacks', () => {
  const onChange = jest.fn();
  const onCancel = jest.fn();
  const onSave = jest.fn();

  render(
    <SaveAsModal value="Test" onChange={onChange} onCancel={onCancel} onSave={onSave} />
  );

  const input = screen.getByDisplayValue('Test');
  fireEvent.change(input, { target: { value: 'New' } });
  expect(onChange).toHaveBeenCalledWith('New');

  fireEvent.click(screen.getByText('Cancel'));
  expect(onCancel).toHaveBeenCalled();

  fireEvent.click(screen.getByText('Save'));
  expect(onSave).toHaveBeenCalled();
});
