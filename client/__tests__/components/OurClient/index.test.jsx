// OurClient.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { OurClient } from '@components/OurClient';

// Lokalisasi dan pesan contoh (sesuaikan dengan kebutuhan Anda)
const messages = {
  app_events_description: 'Deskripsi Acara',
};

describe('OurClient Component', () => {
  beforeEach(() => {
    render(
      <IntlProvider locale="id-ID" messages={messages}>
        <OurClient data-testid="our-client" />
      </IntlProvider>
    );
  });

  it('should render correctly', () => {
    expect(screen.getByTestId('our-client')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const ourClientComponent = screen.getByTestId('our-client');
    expect(ourClientComponent).toMatchSnapshot();
  });
});
