import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDialog from '@components/EventDialog';

// Mock module yang tidak perlu
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  connect: () => (Component) => (props) => <Component {...props} />,
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('react-intl', () => ({
  FormattedMessage: jest.fn(({ id }) => <span>{id}</span>),
  injectIntl: (Component) => (props) => <Component {...props} intl={{ formatMessage: (msg) => msg.id }} />,
}));

describe('EventDialog', () => {
  const mockOnClose = jest.fn();
  const mockEvent = {
    id: 1,
    eventName: 'Konser Musik Akbar',
    date: '2023-04-01',
    time: '19:00',
    registrationDealine: '2023-03-30',
    address: 'Jalan Merdeka No. 123',
    venueName: 'Stadion Merdeka',
    price: 50000,
    stok: 100,
    type: 'offline',
    status: 'active',
    description: '<p>Konser musik tahunan dengan bintang tamu terkenal.</p>',
    locationId: 1,
    categoryId: 1,
    image: '/path/to/image.jpg',
    Location: {
      namaProvinsi: 'Jakarta',
    },
    Category: {
      categoryName: 'Musik',
    },
  };
  const mockLocations = [{ id: 1, namaProvinsi: 'Jakarta' }];
  const mockCategories = [{ id: 1, categoryName: 'Music' }];
  const mockToken = 'fakeToken';
  const mockUser = { id: 1, role: 'user' };

  beforeEach(() => {
    render(
      <EventDialog
        open
        onClose={mockOnClose}
        mode="edit"
        myEvent={mockEvent}
        locations={mockLocations}
        categories={mockCategories}
        token={mockToken}
        user={mockUser}
        intl={{ formatMessage: (msg) => msg.id }}
      />
    );
  });

  test('Should render correctly', () => {
    expect(screen.getByTestId('event-dialog')).toBeInTheDocument();
  });

  test('Should call onClose when close button is clicked', () => {
    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('Should call onSubmit when submit button is clicked', () => {
    fireEvent.click(screen.getByTestId('submit-button'));
  });

  test('Should match snapshot', () => {
    const dialog = screen.getByTestId('event-dialog');
    expect(dialog).toMatchSnapshot();
  });
});
