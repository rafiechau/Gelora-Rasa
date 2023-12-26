import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import ReviewSection from '@components/ReviewSection';

const mockReviews = [
  {
    name: 'John Doe',
    activity: 'Reviewed 2 days ago',
    image: 'path_to_image.jpg',
    rating: 4,
    title: 'Great Experience',
    description: 'I had a fantastic time using this product!',
  },
];

describe('ReviewSection', () => {
  beforeEach(() => {
    render(
      <IntlProvider locale="id" messages={{ app_stars: 'stars' }}>
        <ReviewSection reviews={mockReviews} />
      </IntlProvider>
    );
  });

  test('renders the review section', () => {
    expect(screen.getByTestId('review-section')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const reviewSection = screen.getByTestId('review-section');
    expect(reviewSection).toMatchSnapshot();
  });
});
