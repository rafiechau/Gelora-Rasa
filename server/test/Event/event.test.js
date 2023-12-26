const request = require('supertest');
const app = require('../../index');
const { sequelize } = require('../../models/index');
const { queryInterface } = sequelize;
const { createToken } = require('../../utils/jwt');
const jwt = require('jsonwebtoken');
const path = require('path');

const dummyUser = {
    firstName: 'Test User',
    lastName: 'last',
    email: 'testuser@example.com',
    password: 'password',
    confirmPassword: 'password',
    role: 2,
};


let token;
let userId;

const eventPayload = {
    eventName: 'New Event',
    date: '2023-01-01',
    time: '14:30',
    registrationDealine: '2023-01-01',
    type: 'Type',
    address: 'Address',
    venueName: 'Venue',
    status: 'active',
    price: '100',
    stok: 50,
    description: 'Event Description',
    locationId: 1,
    categoryId: 1,
    userId: userId
};

beforeAll(async () => {
    try {
      const response = await request(app)
        .post('/api/auth/register')
        .send(dummyUser);
  
      if (!response.body || !response.body.data || !response.body.data.id) {
        throw new Error('Invalid response body structure');
      }
  
      const dataUser = {
        id: response.body.data.id,
        firstName: response.body.data.firstName,
        lastName: response.body.data.lastName,
        email: response.body.data.email,
        role: response.body.data.role,
      };
  
      token = createToken(dataUser);
      userId = dataUser.id
      console.log(token, "Token set in beforeAll");
  
      await queryInterface.bulkInsert('Events', [
        {
          eventName: 'Event 1',
          date: new Date(),
          time: '14:30:00',
          registrationDealine: new Date(),
          type: 'xxxx',
          address: 'xxxx',
          venueName: 'xxxx',
          status: 'active',
          image: 'xxxx',
          price: 'xxxx',
          stok: 99,
          description: 'xxxx',
          locationId: 1,
          categoryId: 1,
          userId: dataUser.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (err) {
      console.error('Error in beforeAll:', err);
    }
});

afterAll(async () => {
    try {
        await queryInterface.bulkDelete('Events', null, {});
        await queryInterface.bulkDelete('Users', null, {});
    } catch (err) {
        console.error('Error in afterAll:', err);
    }
});




describe('Create Event', () => {
  test('Should create a new event with image upload', async () => {
    eventPayload.userId = userId;

    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'default1.jpg');

    const response = await request(app)
      .post('/api/events/create')
      .set('Authorization', `Bearer ${token}`)
      .field('eventName', eventPayload.eventName)
      .field('date', eventPayload.date)
      .field('time', eventPayload.time)
      .field('registrationDealine', eventPayload.registrationDealine)
      .field('type', eventPayload.type)
      .field('address', eventPayload.address)
      .field('venueName', eventPayload.venueName)
      .field('status', eventPayload.status)
      .field('price', eventPayload.price)
      .field('stok', eventPayload.stok)
      .field('description', eventPayload.description)
      .field('locationId', eventPayload.locationId)
      .field('categoryId', eventPayload.categoryId)
      .field('userId', eventPayload.userId)
      .attach('image', imagePath);

    console.log(response)
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('eventName', eventPayload.eventName);
  });

});

describe('Get All Events', () => {
    test('Should retrieve paginated list of active events', async () => {
        const page = 1;
        const pageSize = 10;

        const response = await request(app)
            .get(`/api/events?page=${page}&pageSize=${pageSize}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('events');
        expect(Array.isArray(response.body.events)).toBeTruthy();
        expect(response.body.events.length).toBeLessThanOrEqual(pageSize);
        expect(response.body).toHaveProperty('totalPages');
        expect(response.body).toHaveProperty('currentPage', page);
        response.body.events.forEach(event => {
            expect(event.status).toEqual('active');
        });
    });
});

describe('Update Event', () => {
    let existingEventId;
  
    beforeAll(async () => {
      // Retrieve an existing event ID to update
      const eventResponse = await request(app)
        .get('/api/events')
        .set('Authorization', `Bearer ${token}`);
      
      if (!eventResponse.body.events || eventResponse.body.events.length === 0) {
        throw new Error('No events found to update');
      }
  
      existingEventId = eventResponse.body.events[0].id;
    });
  
    test('Should update an existing event with or without a new image', async () => {
      const updatePayload = {
        eventName: 'Updated Event',
        date: '2023-02-02',
        time: '15:00',
        registrationDealine: '2023-02-15',
        type: 'Updated Type',
        address: 'Updated Address',
        venueName: 'Updated Venue',
        status: 'active',
        price: '200',
        stok: 60,
        description: 'Updated Description',
        locationId: 2,
        categoryId: 2,
        userId: userId
      };
  
      const imagePath = path.join(__dirname, '..', '..', 'uploads', 'default1.jpg'); 
  
      const response = await request(app)
        .put(`/api/events/update/${existingEventId}`)
        .set('Authorization', `Bearer ${token}`)
        .field('eventName', updatePayload.eventName)
        .field('date', updatePayload.date)
        .field('time', updatePayload.time)
        .field('registrationDealine', updatePayload.registrationDealine)
        .field('type', updatePayload.type)
        .field('address', updatePayload.address)
        .field('venueName', updatePayload.venueName)
        .field('status', updatePayload.status)
        .field('price', updatePayload.price)
        .field('stok', updatePayload.stok)
        .field('description', updatePayload.description)
        .field('locationId', updatePayload.locationId)
        .field('categoryId', updatePayload.categoryId)
        .field('userId', updatePayload.userId)
        .attach('image', imagePath); 
  
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'success update data event');
    });
});

describe('Update Event Status', () => {
    let eventToUpdateId;
  
    beforeAll(async () => {
      const eventResponse = await request(app)
        .get('/api/events')
        .set('Authorization', `Bearer ${token}`);
  
      if (!eventResponse.body.events || eventResponse.body.events.length === 0) {
        throw new Error('No events found to update status');
      }
  
      eventToUpdateId = eventResponse.body.events[0].id;
    });
  
    test('Should update the status of an existing event', async () => {
      const response = await request(app)
        .put(`/api/events/update-status/${eventToUpdateId}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Event status updated successfully');
  
      const updatedEventResponse = await request(app)
        .get(`/api/events/detail/${eventToUpdateId}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(updatedEventResponse.body.status).toEqual('non-active');
    });
});

describe('Delete Event', () => {
    let eventToDeleteId;
    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'default1.jpg'); 
    beforeAll(async () => {
      const createResponse = await request(app)
        .post('/api/events/create')
        .set('Authorization', `Bearer ${token}`)
        .field('eventName', 'Event to Delete')
        .field('date', '2023-01-01')
        .field('time', '14:30')
        .field('registrationDealine', '2023-01-01')
        .field('type', 'Type')
        .field('address', 'Address')
        .field('venueName', 'Venue')
        .field('status', 'active')
        .field('price', '100')
        .field('stok', '50')
        .field('description', 'Description')
        .field('locationId', 1)
        .field('categoryId', 1)
        .field('userId', userId)
        .attach('image', imagePath)
  
      if (!createResponse.body || !createResponse.body.data || !createResponse.body.data.id) {
        throw new Error('Failed to create event for deletion');
      }
  
      eventToDeleteId = createResponse.body.data.id;
    });
  
    test('Should delete an existing event', async () => {
      const response = await request(app)
        .delete(`/api/events/delete/${eventToDeleteId}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Event successfully deleted.');

      const fetchResponse = await request(app)
        .get(`/api/events/${eventToDeleteId}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(fetchResponse.statusCode).toBe(404); // Assuming that a 404 is returned for non-existent events
    });
  });


  describe('Get Detail Event', () => {
    let detailEventId;

    beforeAll(async () => {
        const eventResponse = await request(app)
            .get('/api/events')
            .set('Authorization', `Bearer ${token}`);

        if (!eventResponse.body.events || eventResponse.body.events.length === 0) {
            throw new Error('No events found for detail view');
        }

        detailEventId = eventResponse.body.events[0].id;
    });

    test('Should retrieve details of an existing event', async () => {
        const response = await request(app)
            .get(`/api/events/detail/${detailEventId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', detailEventId);
        expect(response.body).toHaveProperty('eventName');
        expect(response.body).toHaveProperty('date');
        expect(response.body).toHaveProperty('time');

    });
});

describe('Get My Events', () => {
    test('Should retrieve a list of events created by the user', async () => {
        const response = await request(app)
            .get('/api/events/myEvent')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBeTruthy();

        response.body.data.forEach(event => {
            expect(event.userId).toEqual(userId);
        });
    });
});

describe('Get User Profile by ID', () => {
    test('Should retrieve a user profile with their events', async () => {
        const response = await request(app)
            .get(`/api/events/event-organizer/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        console.log(response)
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id', userId);
        expect(Array.isArray(response.body.data.Events)).toBeTruthy();

    });
})