import { render, fireEvent, screen } from '@testing-library/react';
import CardItem from '@components/CardItem';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockEvent = {
  id: 1,
  eventName: 'Sample Event',
  date: '2023-01-01',
  price: 10000,
  image: '/path/to/image.jpg',
  Location: {
    namaProvinsi: 'Some Province',
  },
};

let wrapper;

beforeEach(() => {
  wrapper = render(<CardItem event={mockEvent} />);
});

describe('CardItem', () => {
  test('Should render correctly', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('CardItem')).toBeInTheDocument();
  });

  test('Should navigate to detail page on card click', () => {
    const { getByTestId } = wrapper;
    const cardActionArea = getByTestId('card-action-area');
    fireEvent.click(cardActionArea);
    expect(mockNavigate).toHaveBeenCalledWith(`/detail/${mockEvent.id}`);
  });

  test('Should render event name correctly', () => {
    expect(screen.getByText(mockEvent.eventName)).toBeInTheDocument();
  });

  test('Should match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
