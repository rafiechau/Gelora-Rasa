import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import OrderDetailsDialog from '@components/OrderDetailsDialog';

// Contoh properti untuk OrderDetailsDialog
const mockOrderProps = {
  eventName: 'Test Event',
  totalTickets: 2,
  totalPay: '100000',
  status: 'Confirmed',
  tanggalPembelian: '2023-01-01T12:00:00',
};

const mockOnClose = jest.fn();

const messages = {
  app_title_order_details: 'Detail Order',
};

describe('OrderDetailsDialog', () => {
  beforeEach(() => {
    render(
      <IntlProvider locale="id-ID" messages={messages}>
        <OrderDetailsDialog open onClose={mockOnClose} order={mockOrderProps} data-testid="order-details-dialog" />
      </IntlProvider>
    );
  });

  it('renders correctly and matches snapshot', () => {
    expect(screen.getByTestId('order-details-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('order-details-dialog')).toMatchSnapshot();
  });

  it('calls onClose when close button is clicked', () => {
    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
