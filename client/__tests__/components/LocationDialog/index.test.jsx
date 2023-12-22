import { render, fireEvent, screen } from '@testing-library/react';
import { LocationDialog } from '@components/LocationDialog';
import * as redux from 'react-redux';
import * as reactIntl from 'react-intl';
import { ThemeProvider, createTheme } from '@mui/material';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-intl', () => ({
  injectIntl: jest.fn((Component) => (props) => <Component {...props} intl={{ formatMessage: (msg) => msg.id }} />),
  FormattedMessage: jest.fn(({ id }) => <span>{id}</span>),
}));

const mockClose = jest.fn();
const mockCurrentLocation = {
  id: 1,
  namaProvinsi: 'Sample Province',
};

const theme = createTheme();

describe('LocationDialog', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <LocationDialog open onClose={mockClose} currentLocation={mockCurrentLocation} />
      </ThemeProvider>
    );
  });

  test('Should render correctly', () => {
    expect(screen.getByTestId('location-dialog')).toBeInTheDocument();
  });

  // test('Should call onClose when close button is clicked', () => {
  //   const closeButton = screen.getByTestId('close-button');
  //   fireEvent.click(closeButton);
  //   expect(mockClose).toHaveBeenCalled();
  // });

  // test('Should render location name in edit mode', () => {
  //   const input = screen.getByLabelText('app_location_name');
  //   expect(input.value).toBe(mockCurrentLocation.namaProvinsi);
  // });

  // test('Should match with snapshot', () => {
  //   const dialog = screen.getByTestId('location-dialog');
  //   expect(dialog).toMatchSnapshot();
  // });
});
