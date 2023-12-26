import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog';

jest.mock('react-intl', () => ({
  FormattedMessage: jest.fn(({ id }) => <span>{id}</span>),
}));

describe('DeleteConfirmationDialog', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(
      <DeleteConfirmationDialog
        open
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        dialogTitle="Confirm Delete"
        dialogContent="Are you sure you want to delete this?"
      />
    );
  });

  test('Should render correctly', () => {
    expect(screen.getByTestId('delete-confirmation-dialog')).toBeInTheDocument();
  });

  test('Should call onCancel when cancel button is clicked', () => {
    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('Should call onConfirm when confirm button is clicked', () => {
    const confirmButton = screen.getByTestId('confirm-button');
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test('Should match snapshot', () => {
    const dialog = screen.getByTestId('delete-confirmation-dialog');
    expect(dialog).toMatchSnapshot();
  });
});
