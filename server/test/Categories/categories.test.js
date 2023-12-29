
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
      return queryInterface.bulkInsert('Categories', [
        { categoryName: 'Category 1', createdAt: new Date(), updatedAt: new Date() },
        { categoryName: 'Category 2', createdAt: new Date(), updatedAt: new Date() },
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
    queryInterface.bulkDelete('Categories', null, {})
  ])
  .then(() => {
    redisClient.flushdb();
    done()
  })
  .catch((err) => {
    done(err)
  })
})


describe('Get All Categories', () => {
  test('Success get Categories from cache with status 200', (done) => {
    const mockCategories = [{ id: 1, categoryName: 'Mock Category' }];
    redisClient.set(process.env.REDIS_KEY_CATEGORIES, JSON.stringify(mockCategories));

    request(app)
      .get('/api/categories/')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual(mockCategories);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  test('Success get Categories with status 200', (done) => {

    redisClient.del(process.env.REDIS_KEY_CATEGORIES);

    request(app)
    .get('/api/categories/')
    .set('authorization', `Bearer ${token}`)
    .then((response) => { 
      expect(response.status).toBe(200); 
      expect(response.body).toHaveProperty('data'); 
      expect(response.body.data[0]).toHaveProperty('id'); 
      done();
    })
    .catch((err) => {
      done(err)
    })
  })
})

describe('Create Category', () => {
  const newCategory = {
    categoryName: 'New Category'
  };

  test('Success create new category', (done) => {
    request(app)
      .post('/api/categories/create')
      .send(newCategory)
      .set('authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.categoryName).toBe(newCategory.categoryName);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Fails when category already exists', (done) => {
    request(app)
      .post('/api/categories/create')
      .send(newCategory)
      .set('authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Category already existed");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Fails with invalid data (validation error)', (done) => {
    const invalidCategory = { categoryName: '' }; 
    request(app)
      .post('/api/categories/create')
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

describe('Update Category', () => {
  const updatedCategoryData = {
    categoryName: 'Updated Category'
  };
  let existingCategoryId;

  beforeAll(async () => {
    const response = await request(app)
      .get('/api/categories/')
      .set('authorization', `Bearer ${token}`);
    existingCategoryId = response.body.data[0].id;
  });

  test('Success update existing category', (done) => {
    request(app)
      .put(`/api/categories/update/${existingCategoryId}`)
      .send(updatedCategoryData)
      .set('authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("success update data category");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Fails when category not found', (done) => {
    const nonExistingCategoryId = 9999; 
    request(app)
      .put(`/api/categories/update/${nonExistingCategoryId}`)
      .send(updatedCategoryData)
      .set('authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Category not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Fails with invalid data (validation error)', (done) => {
    const invalidCategoryData = { categoryName: '' }; 
    request(app)
      .put(`/api/categories/update/${existingCategoryId}`)
      .send(invalidCategoryData)
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

describe('Delete Category', () => {
  let categoryIdToDelete;

  beforeAll(async () => {
    const newCategoryResponse = await request(app)
      .post('/api/categories/create')
      .send({ categoryName: 'Category to Delete' })
      .set('authorization', `Bearer ${token}`);
    categoryIdToDelete = newCategoryResponse.body.data.id;
  });

  test('Success delete existing category', async () => {
    const response = await request(app)
      .delete(`/api/categories/delete/${categoryIdToDelete}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Category successfully deleted.');
  });

  test('Fails when category not found', async () => {
    const nonExistingCategoryId = 9999;
    const response = await request(app)
      .delete(`/api/categories/delete/${nonExistingCategoryId}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Category not found");
  });

});



