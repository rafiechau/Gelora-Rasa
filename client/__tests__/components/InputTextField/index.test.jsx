import React from 'react';
import { render } from '@testing-library/react';
import InputTextField from '@components/InputTextField';

// Contoh properti untuk InputTextField
const mockInputProps = {
  name: 'testName',
  placeholder: 'Enter text',
  label: 'Test Label',
  required: 'This field is required',
  pattern: /some-regex/,
  type: 'text',
  value: '',
  messagePattern: 'Invalid pattern',
  messageMin: 'Too short',
  minLength: 3,
};

const mockRegister = () => {};

const mockErrors = {};

describe('InputTextField', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <InputTextField
        input={mockInputProps}
        register={mockRegister}
        errors={mockErrors}
        data-testid="input-text-field"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
