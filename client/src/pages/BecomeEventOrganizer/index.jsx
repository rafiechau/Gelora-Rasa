/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Tesseract from 'tesseract.js';
import InputTextField from '@components/InputTextField';
import { useForm } from 'react-hook-form';
import { selectToken } from '@containers/Client/selectors';
import { Box, CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { createEventOrganizer } from './actions';
import classes from './style.module.scss';

const BecomeEventOrganizerPage = ({ intl: { formatMessage }, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        setImage(event.target.result);
      };
      fileReader.readAsDataURL(e.target.files[0]);
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
      namaLengkap: nameMatch ? nameMatch[1].replace(/\nTempat$/, '').trim() : '',
      jenisKelamin: genderMatch ? genderMatch[1].trim() : '',
      golonganDarah: bloodTypeMatch ? bloodTypeMatch[1].trim() : '',
      tempatLahir: placeAndDateOfBirthMatch ? placeAndDateOfBirthMatch[1].trim() : ' ',
      tanggalLahir: placeAndDateOfBirthMatch ? placeAndDateOfBirthMatch[2].trim() : ' ',
      provinsi: provinceMatch ? province : '',
      kotaKabupaten: provinceMatch ? city : '',
      alamat: addressMatch ? addressMatch[1].trim() : '',
      rt: parts[0] ? parts[0] : '',
      rw: parts[1] ? parts[1] : '',
      kelurahanDesa: kelurahanDesaMatch ? kelurahan[0] : '',
      kecamatan: kecamatanMatch ? kecamatan[0] : '',
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
    dispatch(
      createEventOrganizer(data, token, () => {
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      })
    );
  };

  return (
    <div className={classes.ktpForm}>
      <div className={classes.containerForm}>
        <div className={classes.title}>
          <FormattedMessage id="app_header_become_event_organizer" />
        </div>
        <div className={classes.imgPreviewContainer}>
          <label htmlFor="image-input">
            <img className={classes.imgPreview} src={image || '/assets/images/defaultImg.png'} alt="Preview" />
            <Box className={classes.addIcon}>
              <AddCircleOutlineIcon fontSize="large" />
            </Box>
          </label>
        </div>
        <input type="file" id="image-input" style={{ display: 'none' }} onChange={handleImageChange} />
        <button type="button" onClick={handleScan} disabled={!image || isLoading}>
          <FormattedMessage id="app_scan_ktp" />
        </button>
        {isLoading && (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )}
        <div className={classes.txtUploadKTP}>
          <FormattedMessage id="app_ktp_sub_title" />
        </div>
        <div className={classes.descClearPhoto}>
          <FormattedMessage id="app_ktp_sub_title_2" />
        </div>
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
              name: 'namaLengkap',
              required: formatMessage({ id: 'app_ktp_name_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_name' }),
            }}
            register={register}
            errors={errors}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <InputTextField
              input={{
                name: 'jenisKelamin',
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
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <InputTextField
              input={{
                name: 'tempatLahir',
                required: formatMessage({ id: 'app_ktp_place_of_birth_require_message' }),
                type: 'text',
                label: formatMessage({ id: 'app_ktp_place_of_birth' }),
              }}
              register={register}
              errors={errors}
            />
            <InputTextField
              input={{
                name: 'tanggalLahir',
                required: formatMessage({ id: 'app_ktp_date_of_birth_require_message' }),
                type: 'text',
                label: formatMessage({ id: 'app_ktp_date_of_birth' }),
              }}
              register={register}
              errors={errors}
            />
          </Box>

          <InputTextField
            input={{
              name: 'provinsi',
              required: formatMessage({ id: 'app_ktp_province_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_province' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'kotaKabupaten',
              required: formatMessage({ id: 'app_ktp_KotaKabupaten_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_KotaKabupaten' }),
            }}
            register={register}
            errors={errors}
          />

          <InputTextField
            input={{
              name: 'alamat',
              required: formatMessage({ id: 'app_ktp_address_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_ktp_address' }),
            }}
            register={register}
            errors={errors}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
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
          </Box>

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
          <button type="submit" className={classes.buttonSubmit}>
            <FormattedMessage id="app_btn_submit" />
          </button>
        </form>
      </div>
    </div>
  );
};

BecomeEventOrganizerPage.propTypes = {
  intl: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(BecomeEventOrganizerPage));
