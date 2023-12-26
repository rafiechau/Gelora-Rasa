import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditProfileDialog from '@components/EditDialogProfile';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('react-intl', () => ({
  FormattedMessage: jest.fn(({ id }) => <span>{id}</span>),
  injectIntl: (Component) => (props) => <Component {...props} intl={{ formatMessage: (msg) => msg.id }} />,
}));

describe('EditProfileDialog', () => {
  const mockOnClose = jest.fn();
  const mockProfileUser = { firstName: 'John', lastName: 'Doe' };

  beforeEach(() => {
    render(
      <EditProfileDialog
        open
        onClose={mockOnClose}
        intl={{ formatMessage: (msg) => msg.id }}
        profileUser={mockProfileUser}
      />
    );
  });

  test('Should render correctly', () => {
    expect(screen.getByTestId('edit-profile-dialog')).toBeInTheDocument();
  });

  test('Should call onClose when close button is clicked', () => {
    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('Should call onSubmit when submit button is clicked', () => {
    fireEvent.click(screen.getByTestId('submit-button'));
  });

  test('Should match snapshot', () => {
    const dialog = screen.getByTestId('edit-profile-dialog');
    expect(dialog).toMatchSnapshot();
  });
});
