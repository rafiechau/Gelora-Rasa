import PropTypes from 'prop-types';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Tesseract from 'tesseract.js';

import InputTextField from '@components/InputTextField';
import { useForm } from 'react-hook-form';
import classes from './style.module.scss';

const BecomeEventOrganizerPage = ({ intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const parseOcrText = (text) => {
    const nikMatch = text.match(/NIK\s*:\s*([\d]+)/);
    const nameMatch = text.match(/Nama\s*:\s*([\w\s]+)/);
    const placeAndDateOfBirthMatch = text.match(/Tempat\/Tgi Lahir\s*:\s*([\w\s]+),\s*([\d-]+)/);
    const genderMatch = text.match(/Jenis Kelamin\s*:\s*([\w\s]+)/);
    const bloodTypeMatch = text.match(/Gol\.Darah\s*:\s*([A-Z]+)/);

    const provinceMatch = text.match(/PROVINSI\s+([A-Z\s]+)/);

    const addressMatch = text.match(/Alamat\s*:\s*([\w\s.]+)/);
    const rtRwMatch = text.match(/RTIRW\s*:\s*([\d/]+)/);
    const kelurahanDesaMatch = text.match(/KellDesa\s*——\s*:\s*([\w\s]+)/);
    const kecamatanMatch = text.match(/Kecamatan\s*:\s*([\w\s]+)/);
    const agamaMatch = text.match(/Agama\s*:\s*([\w\s]+)/);
    const maritalStatusMatch = text.match(/Status Perkawinan\s*:\s*([\w\s]+)/);
    const occupationMatch = text.match(/Pekerjaan\s*:\s*([\w\s]+)/);
    const citizenshipMatch = text.match(/Kewarganegaraan\s*:\s*([\w\s]+)/);

    const kelurahan = kelurahanDesaMatch[1].split('  ');
    const kecamatan = kecamatanMatch[1].split('  ');
    const citizen = citizenshipMatch[1].split(' ');

    const parts = rtRwMatch[1].split('/');
    const [province, city] = provinceMatch[1].split('\n');

    const result = {
      nik: nikMatch ? nikMatch[1] : '',
      nameKtp: nameMatch ? nameMatch[1].replace(/\nTempat$/, '').trim() : '',
      gender: genderMatch ? genderMatch[1].trim() : '',
      golonganDarah: bloodTypeMatch ? bloodTypeMatch[1].trim() : '',
      placeOfBirth: placeAndDateOfBirthMatch ? placeAndDateOfBirthMatch[1].trim() : ' ',
      dateOfBirth: placeAndDateOfBirthMatch ? placeAndDateOfBirthMatch[2].trim() : ' ',
      province: provinceMatch ? province : '',
      KotaKabupaten: provinceMatch ? city : '',
      address: addressMatch ? addressMatch[1].trim() : '',
      rt: parts[0] ? parts[0] : '',
      rw: parts[1] ? parts[1] : '',
      kelurahanDesa: kelurahanDesaMatch ? kelurahan : '',
      kecamatan: kecamatanMatch ? kecamatan : '',
      agama: agamaMatch ? agamaMatch[1].replace('Status Perkawinan', '').trim() : '',
      statusPerkawinan: maritalStatusMatch ? maritalStatusMatch[1].replace('Pekerjaan', '').trim() : '',
      statusKerja: occupationMatch ? occupationMatch[1].replace('Kewarganegaraan', '').trim() : '',
      kewarganegaraan: citizenshipMatch ? citizen[0] : '',
    };

    // Set value untuk form
    Object.keys(result).forEach((key) => {
      setValue(key, result[key]);
    });

    return result;
  };

  const handleScan = () => {
    setIsLoading(true);
    Tesseract.recognize(
      image,
      'ind', // Bahasa
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setOcrResult(parseOcrText(text));
      setIsLoading(false);
    });
  };

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
  };

  return (
    <div className={classes.ktpForm}>
      <div className={classes.containerForm}>
        <div className={classes.title}>Become a Event Organizer</div>
        <img className={classes.imgPreview} src="/assets/images/defaultImg.png" alt="Preview" />
        <input type="file" onChange={handleImageChange} />
        <button type="button" onClick={handleScan} disabled={!image || isLoading}>
          Scan KTP
        </button>
        {isLoading && <p>Scanning...</p>}
        <div className={classes.txtUploadKTP}>Upload KTP kamu atau lansung isi di form</div>
        <div className={classes.descClearPhoto}>Pastikan Photo kamu jelas</div>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {/* niknya dibikin readonly  */}
          <InputTextField
            input={{
              name: 'nik',
              required: formatMessage({ id: 'app_ktp_nik_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_nik' }),
              pattern: /^[0-9]{16}$/i,
              messagePatern: formatMessage({ id: 'app_ktp_nik_require_message' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'nameKtp',
              required: formatMessage({ id: 'app_ktp_name_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_name' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'gender',
              required: formatMessage({ id: 'app_ktp_jenisKelamin_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_jenisKelamin' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'golonganDarah',
              required: formatMessage({ id: 'app_ktp_golonganDarah_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_golonganDarah' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'placeOfBirth',
              required: formatMessage({ id: 'app_ktp_place_of_birth_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_place_of_birth' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'dateOfBirth',
              required: formatMessage({ id: 'app_ktp_date_of_birth_require_message' }),
              type: 'date',
              label: formatMessage({ id: 'app_ktp_date_of_birth' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'province',
              required: formatMessage({ id: 'app_ktp_province_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_province' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'KotaKabupaten',
              required: formatMessage({ id: 'app_ktp_KotaKabupaten_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_KotaKabupaten' }),
            }}
            register={register}
            errors={errors}
          />

          <InputTextField
            input={{
              name: 'address',
              required: formatMessage({ id: 'app_ktp_address_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_address' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'rt',
              required: formatMessage({ id: 'app_ktp_rt_require_message' }),
              type: 'number',
              label: formatMessage({ id: 'app_ktp_rt' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'rw',
              required: formatMessage({ id: 'app_ktp_rw_require_message' }),
              type: 'number',
              label: formatMessage({ id: 'app_ktp_rw' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'kelurahanDesa',
              required: formatMessage({ id: 'app_ktp_kelurahanDesa_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_kelurahanDesa' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'kecamatan',
              required: formatMessage({ id: 'app_ktp_kecamatan_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_kecamatan' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'agama',
              required: formatMessage({ id: 'app_ktp_agama_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_agama' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'statusPerkawinan',
              required: formatMessage({ id: 'app_ktp_statusPerkawinan_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_statusPerkawinan' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'statusKerja',
              required: formatMessage({ id: 'app_ktp_statusKerja_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_statusKerja' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'kewarganegaraan',
              required: formatMessage({ id: 'app_ktp_kewarganegaraan_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_kewarganegaraan' }),
            }}
            register={register}
            errors={errors}
          />
        </form>
      </div>
    </div>

    // <div>
    //   <input type="file" onChange={handleImageChange} />
    //   <button type="button" onClick={handleScan} disabled={!image || isLoading}>
    //     Scan
    //   </button>

    //   {isLoading && <p>Scanning...</p>}

    //   <input type="text" value={ocrResult.nik || ''} placeholder="NIK" readOnly />
    //   <input type="text" value={ocrResult.nama || ''} placeholder="Nama" readOnly />
    //   {/* Komponen input lainnya */}
    // </div>
  );
};

BecomeEventOrganizerPage.propTypes = {
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});

export default injectIntl(connect(mapStateToProps)(BecomeEventOrganizerPage));
