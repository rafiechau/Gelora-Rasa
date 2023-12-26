import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminTable from '@components/AdminTable';

jest.mock('react-intl', () => ({
  // eslint-disable-next-line react/prop-types
  FormattedMessage: ({ id }) => <span>{id}</span>,
}));

const columns = [
  { id: 'name', messageId: 'name', label: 'Name' },
  { id: 'age', messageId: 'age', label: 'Age' },
];

const data = [
  { id: '1', name: 'John Doe', age: '30' },
  { id: '2', name: 'Jane Doe', age: '25' },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('AdminTable Component', () => {
  it('should render the component correctly', () => {
    const { getByTestId, getByText } = render(
      <AdminTable columns={columns} data={data} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    // Check for the presence of the table
    expect(getByTestId('admin-table')).toBeInTheDocument();

    // Check if column headers are rendered
    columns.forEach((column) => {
      expect(getByText(column.id)).toBeInTheDocument();
    });

    // Check if data is rendered
    data.forEach((row) => {
      columns.forEach((column) => {
        expect(getByText(row[column.id])).toBeInTheDocument();
      });
    });
  });

  it('should handle edit button click', () => {
    const { getByTestId } = render(
      <AdminTable columns={columns} data={data} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    // Simulate click on the first edit button
    fireEvent.click(getByTestId(`edit-button-${data[0].id}`));
    expect(mockOnEdit).toHaveBeenCalledWith(data[0]);
  });

  it('should handle delete button click', () => {
    const { getByTestId } = render(
      <AdminTable columns={columns} data={data} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    // Simulate click on the first delete button
    fireEvent.click(getByTestId(`delete-button-${data[0].id}`));
    expect(mockOnDelete).toHaveBeenCalledWith(data[0].id);
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <AdminTable columns={columns} data={data} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
