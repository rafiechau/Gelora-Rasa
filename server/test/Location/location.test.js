
const request = require('supertest');
const app = require('../../index');
const { sequelize } = require('../../models/index');
const { queryInterface } = sequelize;
const RedisMock = require('ioredis-mock');
const { createToken } = require('../../utils/jwt');
const redisClient = new RedisMock();

jest.mock('ioredis', () => require('ioredis-mock'));

const dummyUser = {
    firstName: 'Test User',
    lastName: 'last',
    email: 'testuser@example.com',
    password: 'password',
    confirmPassword: 'password',
    role: 3,
};
  
let token;

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
        return queryInterface.bulkInsert('Locations', [
          { namaProvinsi: 'Provinsi 1', createdAt: new Date(), updatedAt: new Date() },
          { namaProvinsi: 'Provinsi 2', createdAt: new Date(), updatedAt: new Date() },
        ]);
      
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
      queryInterface.bulkDelete('Locations', null, {})
    ])
    .then(() => {
      redisClient.flushdb();
      done()
    })
    .catch((err) => {
      done(err)
    })
})

describe('Get All Location', () => {
    test('Success get Locations from database', async () => {
      const response = await request(app)
        .get('/api/location/')
        .set('authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  
    test('Success get Locations from cache', async () => {
      const mockLocations = [{ id: 1, namaProvinsi: 'Mock Provinsi' }];
      await redisClient.set(process.env.REDIS_KEY_LOCATION, JSON.stringify(mockLocations), 'EX', 1000);
  
      const response = await request(app)
        .get('/api/location/')
        .set('authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toEqual(mockLocations);
    });
});


describe('Create Location', () => {
    const newProvinsi = {
        namaProvinsi: 'New Location'
    };
  
    test('Success create new location', (done) => {
      request(app)
        .post('/api/location/create')
        .send(newProvinsi)
        .set('authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('data');
          expect(response.body.data).toHaveProperty('id');
          expect(response.body.data.namaProvinsi).toBe(newProvinsi.namaProvinsi);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    test('Fails when location already exists', (done) => {
      request(app)
        .post('/api/location/create')
        .send(newProvinsi)
        .set('authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body.message).toBe("Nama Provinsi already existed");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    test('Fails with invalid data (validation error)', (done) => {
      const invalidCategory = { namaProvinsi: '' }; 
      request(app)
        .post('/api/location/create')
        .send(invalidCategory)
        .set('authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.status).toBe(400); 
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
});
  
describe('Update Location', () => {
    const updatedLocationData = {
      namaProvinsi: 'Updated Provinsi'
    };
    let existingLocationId;
  
    beforeAll(async () => {
      const response = await request(app)
        .get('/api/location/')
        .set('authorization', `Bearer ${token}`);
      if (response.body.data && response.body.data.length > 0) {
        existingLocationId = response.body.data[0].id;
      }
    });
  
    test('Success update existing location', async () => {
      const response = await request(app)
        .put(`/api/location/update/${existingLocationId}`)
        .send(updatedLocationData)
        .set('authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("success update data location");
    });
  
    test('Fails when location not found', async () => {
      const nonExistingLocationId = 9999;
      const response = await request(app)
        .put(`/api/location/update/${nonExistingLocationId}`)
        .send(updatedLocationData)
        .set('authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Location not found");
    });
  
    test('Fails with invalid data (validation error)', async () => {
      const invalidLocationData = { namaProvinsi: '' };
      const response = await request(app)
        .put(`/api/location/update/${existingLocationId}`)
        .send(invalidLocationData)
        .set('authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(400);
    });
});


describe('Delete Location', () => {
    let locationIdToDelete;
  
    beforeAll(async () => {
      const newLocationResponse = await request(app)
        .post('/api/location/create')
        .send({ namaProvinsi: 'Provinsi to Delete' })
        .set('authorization', `Bearer ${token}`);
      locationIdToDelete = newLocationResponse.body.data.id;
    });
  
    test('Success delete existing location', async () => {
      const response = await request(app)
        .delete(`/api/location/delete/${locationIdToDelete}`)
        .set('authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('location successfully deleted.');
    });
  
    test('Fails when location not found', async () => {
      const nonExistingLocationId = 9999;
      const response = await request(app)
        .delete(`/api/location/delete/${nonExistingLocationId}`)
        .set('authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("location not found");
    });
  
  });
  
  