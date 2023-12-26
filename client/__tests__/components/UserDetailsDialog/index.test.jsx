import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserDetailsDialog from '@components/UserDetailsDialog';
import { IntlProvider } from 'react-intl';

// Mock user data
const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  imagePath: '/path/to/image.jpg',
  detailEventOrganizer: {
    namaLengkap: 'John Doe',
    nik: '1234567890',
    jenisKelamin: 'Male',
    tempatLahir: 'City A',
    tanggalLahir: '2000-01-01',
    golonganDarah: 'O',
    alamat: '123 Main St',
    provinsi: 'Province A',
    kotaKabupaten: 'City B',
    kecamatan: 'District A',
    kelurahanDesa: 'Village A',
    agama: 'Religion A',
    statusPerkawinan: 'Single',
    statusKerja: 'Employed',
    kewarganegaraan: 'Country A',
  },
};

const messages = {
  app_title_user_details: 'User Details',
  user_details_name_ktp: 'KTP Name',
  user_details_nik: 'NIK',
  user_details_gender: 'Gender',
  user_details_birth_place: 'Birth Place',
  user_details_birth_date: 'Birth Date',
  user_details_blood_type: 'Blood Type',
  user_details_address: 'Address',
  user_details_province: 'Province',
  user_details_city: 'City/District',
  user_details_subdistrict: 'Subdistrict',
  user_details_village: 'Village',
  user_details_religion: 'Religion',
  user_details_marital_status: 'Marital Status',
  user_details_job: 'Occupation',
  user_details_nationality: 'Nationality',
  app_column_name: 'Name',
};

const defaultLocale = 'en';

describe('UserDetailsDialog', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(
      <IntlProvider locale={defaultLocale} messages={messages.en}>
        <UserDetailsDialog open onClose={mockOnClose} user={mockUser} />
      </IntlProvider>
    );
  });

  test('renders UserDetailsDialog component', () => {
    expect(screen.getByTestId('user-details-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('app_title_user_details');
  });

  test('calls onClose when close button is clicked', () => {
    fireEvent.click(screen.getByText(/Close/i));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('should match snapshot', () => {
    const dialog = screen.getByTestId('user-details-dialog');
    expect(dialog).toMatchSnapshot();
  });
});
