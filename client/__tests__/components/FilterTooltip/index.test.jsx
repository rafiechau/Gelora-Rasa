import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterTooltip from '@components/FilterTooltip'; // Update the import path as needed

describe('FilterTooltip', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    render(<FilterTooltip onClick={mockOnClick} />);
  });

  test('should render the tooltip button', () => {
    expect(screen.getByTestId('filter-tooltip-button')).toBeInTheDocument();
  });

  test('should call onClick when the button is clicked', () => {
    fireEvent.click(screen.getByTestId('filter-tooltip-button'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('should match the snapshot', () => {
    const tooltipButton = screen.getByTestId('filter-tooltip-button');
    expect(tooltipButton).toMatchSnapshot();
  });
});
