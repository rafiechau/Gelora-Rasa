import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import PopupMessage from '@components/PopupMessage/Dialog';

// Contoh pesan dan judul untuk PopupMessage
const messages = {
  test_title: 'Test Title',
  test_message: 'Test Message',
  app_popup_close_button_label: 'Close',
};

const mockOnClose = jest.fn();

describe('PopupMessage Component', () => {
  beforeEach(() => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <PopupMessage
          open
          onClose={mockOnClose}
          title="test_title"
          message="test_message"
          data-testid="popup-message"
        />
      </IntlProvider>
    );
  });

  test('should render PopupMessage', () => {
    expect(screen.getByTestId('popup-message')).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    fireEvent.click(screen.getByTestId('popup-close-button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('should match snapshot', () => {
    const popupMessage = screen.getByTestId('popup-message');
    expect(popupMessage).toMatchSnapshot();
  });
});
