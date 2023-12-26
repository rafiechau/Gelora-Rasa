import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventImage from '@components/EventImage';

describe('EventImage', () => {
  const mockImageUrl = '/path/to/image.jpg';
  const mockAltText = 'Event Image';

  beforeEach(() => {
    render(<EventImage imageUrl={mockImageUrl} altText={mockAltText} />);
  });

  test('Should render correctly', () => {
    const image = screen.getByTestId('event-image');
    expect(image).toBeInTheDocument();
  });

  test('Should open dialog on image click', () => {
    const image = screen.getByTestId('event-image');
    fireEvent.click(image);
    const dialog = screen.getByTestId('image-dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('Should match snapshot', () => {
    const image = screen.getByTestId('event-image');
    expect(image).toMatchSnapshot();
  });
});
