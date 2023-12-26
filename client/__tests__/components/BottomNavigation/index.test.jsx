// BottomBar.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import BottomBar from '@components/BottomNavigation';

// Mock Material UI Icons
jest.mock('@mui/icons-material/Person', () => () => <div>PersonIcon</div>);
jest.mock('@mui/icons-material/History', () => () => <div>HistoryIcon</div>);
jest.mock('@mui/icons-material/Event', () => () => <div>EventIcon</div>);
jest.mock('@mui/icons-material/LocationOn', () => () => <div>LocationOnIcon</div>);
jest.mock('@mui/icons-material/Group', () => () => <div>GroupIcon</div>);
jest.mock('@mui/icons-material/Category', () => () => <div>CategoryIcon</div>);

// Create a mock Redux store
const mockStore = {
  getState: () => ({}),
  subscribe: () => {},
  dispatch: jest.fn(),
};

describe('BottomBar Component', () => {
  const mockUser = { role: 2 };

  it('renders correctly', () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BottomBar user={mockUser} />
        </MemoryRouter>
      </Provider>
    );
    expect(getByTestId('bottom-navigation')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BottomBar user={mockUser} />
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
