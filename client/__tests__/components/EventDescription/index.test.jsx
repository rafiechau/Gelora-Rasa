import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDescription from '@components/EventDescription';

jest.mock('react-intl', () => ({
  FormattedMessage: jest.fn(({ id }) => <span>{id}</span>),
}));

describe('EventDescription', () => {
  const mockDescription = '<p>This is a test description.</p>';

  test('Should render correctly', () => {
    render(<EventDescription description={mockDescription} />);
    expect(screen.getByTestId('event-description')).toBeInTheDocument();
  });

  test('Should display the correct description', () => {
    render(<EventDescription description={mockDescription} />);
    expect(screen.getByTestId('event-description').innerHTML).toContain(mockDescription);
  });

  test('Should match snapshot', () => {
    const { asFragment } = render(<EventDescription description={mockDescription} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
