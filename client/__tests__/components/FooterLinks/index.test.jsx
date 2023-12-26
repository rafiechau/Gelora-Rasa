import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterLinks from '@components/FooterLinks';

describe('FooterLinks', () => {
  const mockTitle = 'Test Title';
  const mockItems = ['Item 1', 'Item 2', 'Item 3'];

  beforeEach(() => {
    render(<FooterLinks title={mockTitle} items={mockItems} />);
  });

  test('should render FooterLinks component', () => {
    expect(screen.getByTestId('footer-links')).toBeInTheDocument();
  });

  test('should render correct title', () => {
    expect(screen.getByTestId('footer-links-title')).toHaveTextContent(mockTitle);
  });

  test('should render correct number of items', () => {
    const items = screen.getAllByTestId((_, element) =>
      element.getAttribute('data-testid').startsWith('footer-link-item')
    );
    expect(items).toHaveLength(mockItems.length);
  });

  test('should match snapshot', () => {
    const footerLinks = screen.getByTestId('footer-links');
    expect(footerLinks).toMatchSnapshot();
  });
});
