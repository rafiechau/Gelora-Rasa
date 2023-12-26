import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import StatisticsSection from '@components/StatisticsSection';

describe('StatisticsSection', () => {
  beforeEach(() => {
    render(
      <IntlProvider
        locale="en"
        messages={{
          app_events_attended: 'Events Attended',
          app_events_tickets_sold: 'Tickets Sold',
        }}
      >
        <StatisticsSection />
      </IntlProvider>
    );
  });

  test('renders the statistics section', () => {
    expect(screen.getByTestId('statistics-section')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const statisticsSection = screen.getByTestId('statistics-section');
    expect(statisticsSection).toMatchSnapshot();
  });
});
