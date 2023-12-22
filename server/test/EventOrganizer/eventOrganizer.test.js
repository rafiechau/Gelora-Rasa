
const request = require('supertest');
const app = require('../../index');
const { sequelize } = require('../../models/index');
const { queryInterface } = sequelize;
const { createToken } = require('../../utils/jwt');


const dummyUser = {
    firstName: 'Test User',
    lastName: 'last',
    email: 'testuser@example.com',
    password: 'password',
    confirmPassword: 'password',
    role: 1,
};
  
let token;
let updatedToken;
let userId;

beforeAll((done) => {
    request(app)
    .post('/api/auth/register')
    .send(dummyUser)
    .then((response) => { 
      if (response && response.body && response.body.data.id) {
        const dataUser = {
          id: response.body.data.id,
          firstName: response.body.data.firstName,
          lastName: response.body.data.lastName,
          email: response.body.data.email,
          role: response.body.data.role,
        };
        token = createToken(dataUser);
        userId = response.body.data.id
      } else {
        throw new Error('Invalid response body structure');
      }
    })
    .then(() => done())
    .catch((err) => {
      console.error('Error in beforeAll:', err);
      done(err)
    })
})
  
afterAll((done) => {
    Promise.all([
      queryInterface.bulkDelete('Users', null, {}),
      queryInterface.bulkDelete('DetailEventOrganizers', null, {})
    ])
    .then(() => {
      done()
    })
    .catch((err) => {
      done(err)
    })
})

describe('Create Event Organizer', () => {
    const newEventOrganizer = {
        userId: userId,
        nik: '1234567892345678',
        namaLengkap: 'John Doe',
        jenisKelamin: 'Laki-Laki',
        golonganDarah: 'A',
        tempatLahir: 'Jambi',
        tanggalLahir: '12 Desember 2023',
        provinsi: 'Jambi',
        kotaKabupaten: 'Jambi',
        alamat: 'xxxx',
        rt: '14',
        rw: '20',
        kelurahanDesa: 'Jambi selatan',
        kecamatan: 'xxxx',
        agama: 'xxxx',
        statusPerkawinan: 'xxxx',
        statusKerja: 'xxxx',
        kewarganegaraan: 'xxxx',
    };
    test('Success create new event organizer', (done) => {
        request(app)
            .post('/api/event-organizer/create')
            .send(newEventOrganizer)
            .set('authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('token');
                expect(response.body.message).toContain('success created event organizer');
                const updatedUser = { id: userId, ...dummyUser, role: 2 };
                updatedToken = createToken(updatedUser);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test('Fails when event organizer already exists', (done) => {
        request(app)
            .post('/api/event-organizer/create')
            .send(newEventOrganizer)
            .set('authorization', `Bearer ${updatedToken}`)
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe("Event Organizer already existed");
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    test('Fails with invalid data (validation error)', (done) => {
        const invalidEventOrganizer = { ...newEventOrganizer, nik: '' };
        request(app)
            .post('/api/event-organizer/create')
            .send(invalidEventOrganizer)
            .set('authorization', `Bearer ${updatedToken}`)
            .then((response) => {
                expect(response.status).toBe(400);
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

