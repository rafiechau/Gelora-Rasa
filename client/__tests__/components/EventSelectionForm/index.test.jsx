// EventSelectionForm.test.jsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import EventSelectionForm from '@components/EventSelectionForm';

const messages = {
  app_your_event_placeholder: 'Your Active Event',
  app_streaming_send_meeting_id_to_customer: 'Enter Meeting ID',
  app_streaming_send_to_customer: 'Send to Customer',
};

describe('EventSelectionForm', () => {
  const mockEvents = [
    { id: '1', eventName: 'Event 1' },
    { id: '2', eventName: 'Event 2' },
  ];
  const mockHandleEventChange = jest.fn();
  const mockHandleMeetingIdChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <EventSelectionForm
          selectedEventId="1"
          allMyEvents={mockEvents}
          inputMeetingId=""
          handleEventChange={mockHandleEventChange}
          handleMeetingIdChange={mockHandleMeetingIdChange}
          handleSubmit={mockHandleSubmit}
        />
      </IntlProvider>
    );
  });

  test('Should render correctly', () => {
    expect(screen.getByTestId('event-selection-form')).toBeInTheDocument();
  });
  test('Should call onSubmit when form is submitted', () => {
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  test('Should match snapshot', () => {
    const form = screen.getByTestId('event-selection-form');
    expect(form).toMatchSnapshot();
  });
});
