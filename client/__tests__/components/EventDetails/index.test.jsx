import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetail from '@components/EventDetails';

jest.mock('react-intl', () => ({
  FormattedMessage: jest.fn(({ id }) => <span>{id}</span>),
}));

describe('EventDetail', () => {
  const mockEvent = {
    id: 1,
    eventName: 'Musical Night',
    date: '2024-01-01',
    time: '20:00',
    price: 50000,
    address: 'Jalan Raya No.123, Jakarta',
    type: 'hybrid', // 'offline', 'online', atau 'hybrid'
    Location: {
      namaProvinsi: 'Jakarta',
    },
  };
  const formattedDate = '01 Jan 2024';
  const handleTicketQuantityChange = jest.fn();
  const ticketQuantity = 1;
  const selectedTicketType = 'offline';
  const handleTicketTypeChange = jest.fn();
  const handleOrder = jest.fn();
  const countdown = '5 days';
  const canOrder = true;
  const hasOrdered = false;
  const user = { role: 1 };

  beforeEach(() => {
    render(
      <EventDetail
        event={mockEvent}
        formattedDate={formattedDate}
        handleTicketQuantityChange={handleTicketQuantityChange}
        ticketQuantity={ticketQuantity}
        selectedTicketType={selectedTicketType}
        handleTicketTypeChange={handleTicketTypeChange}
        handleOrder={handleOrder}
        countdown={countdown}
        canOrder={canOrder}
        hasOrdered={hasOrdered}
        user={user}
      />
    );
  });

  test('Should render correctly', () => {
    expect(screen.getByTestId('event-detail')).toBeInTheDocument();
  });

  test('Should display correct location and date-time', () => {
    expect(screen.getByTestId('location-container')).toHaveTextContent(mockEvent.Location.namaProvinsi);
    expect(screen.getByTestId('date-time-container')).toHaveTextContent(formattedDate);
  });

  test('Should handle ticket quantity changes', () => {
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('+'));
    expect(handleTicketQuantityChange).toHaveBeenCalledTimes(2);
  });

  test('Should handle order button click', () => {
    fireEvent.click(screen.getByText('Beli Sekarang'));
    expect(handleOrder).toHaveBeenCalled();
  });

  test('Should match snapshot', () => {
    const dialog = screen.getByTestId('event-detail');
    expect(dialog).toMatchSnapshot();
  });
});
