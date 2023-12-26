// Tes untuk TopEventsSection
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopEventsSection from '@components/EventSection';
import { IntlProvider } from 'react-intl';

describe('TopEventsSection', () => {
  const mockEvents = [
    { title: 'Event 1', image: '/img/event1.jpg', category: 'Category 1', date: '2023-01-01' },
    { title: 'Event 2', image: '/img/event2.jpg', category: 'Category 2', date: '2023-02-02' },
  ];
  const mockOnNavigate = jest.fn();

  beforeEach(() => {
    render(
      <IntlProvider locale="id">
        <TopEventsSection events={mockEvents} onNavigate={mockOnNavigate} />
      </IntlProvider>
    );
  });

  test('Should render correctly', () => {
    expect(screen.getByTestId('top-events-section')).toBeInTheDocument();
  });

  test('Should display all events', () => {
    mockEvents.forEach((event, index) => {
      expect(screen.getByTestId(`event-card-${index}`)).toBeInTheDocument();
    });
  });

  test('Should navigate on browse all button click', () => {
    fireEvent.click(screen.getByTestId('browse-all-button'));
    expect(mockOnNavigate).toHaveBeenCalledWith('/login');
  });

  test('Should match snapshot', () => {
    const topEventsSection = screen.getByTestId('top-events-section');
    expect(topEventsSection).toMatchSnapshot();
  });
});
