import { render, fireEvent, screen } from '@testing-library/react';
import CategoryDialog from '@components/CategoryDialog';
import { ThemeProvider, createTheme } from '@mui/material';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-intl', () => ({
  injectIntl: jest.fn((Component) => (props) => <Component {...props} intl={{ formatMessage: (msg) => msg.id }} />),
  FormattedMessage: jest.fn(({ id }) => <span>{id}</span>),
}));

const mockClose = jest.fn();
const mockCurrentCategory = {
  id: 1,
  categoryName: 'Sample Category',
};

const theme = createTheme();

describe('CategoryDialog', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <CategoryDialog open onClose={mockClose} currentCategory={mockCurrentCategory} />
      </ThemeProvider>
    );
  });

  test('Should render correctly', () => {
    expect(screen.getByTestId('category-dialog')).toBeInTheDocument();
  });

  test('Should call onClose when close button is clicked', () => {
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalled();
  });

  test('Should render category name in edit mode', () => {
    const input = screen.getByLabelText('app_category_name');
    expect(input.value).toBe(mockCurrentCategory.categoryName);
  });

  test('Should match with snapshot', () => {
    const dialog = screen.getByTestId('category-dialog');
    expect(dialog).toMatchSnapshot();
  });
});
