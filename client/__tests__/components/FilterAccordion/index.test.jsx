// FilterAccordion.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import FilterAccordion from '@components/FilterAccordion';

describe('FilterAccordion', () => {
  const mockOptions = [
    { id: '1', value: 'option1', label: 'Option 1' },
    { id: '2', value: 'option2', label: 'Option 2' },
  ];
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(
      <FilterAccordion title="Test Title" options={mockOptions} selectedOption="option1" onChange={mockOnChange} />
    );
  });

  test('should render accordion with given title', () => {
    expect(screen.getByTestId('filter-accordion')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('should have correct number of radio options', () => {
    const radioOptions = screen.getAllByTestId((id) => id.startsWith('radio-option-'));
    expect(radioOptions).toHaveLength(mockOptions.length);
  });

  test('should call onChange when a radio option is selected', () => {
    const secondOption = screen.getByTestId('radio-option-2');
    fireEvent.click(secondOption);
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('should match snapshot', () => {
    const { asFragment } = render(
      <FilterAccordion title="Test Title" options={mockOptions} selectedOption="option1" onChange={mockOnChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
