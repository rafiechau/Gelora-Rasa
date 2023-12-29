
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
    role: 1,
};


let token;
let userId;
let orderIdToDelete;

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

      await queryInterface.bulkInsert('Events', [
        {
            eventName: 'Dummy Event',
            date: new Date(),
            time: '10:00',
            registrationDealine: new Date(),
            type: 'Online',
            address: 'Dummy Address',
            venueName: 'Dummy Venue',
            status: 'active',
            image: 'dummy.jpg',
            price: 50000, 
            stok: 100,
            description: 'Dummy event description',
            locationId: 1,
            categoryId: 1,
            userId: userId, 
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const eventResponse = await request(app)
        .get('/api/events')
        .set('Authorization', `Bearer ${token}`);
    
    if (eventResponse.body.events && eventResponse.body.events.length > 0) {
        eventId = eventResponse.body.events[0].id;
    } else {
        throw new Error('No events found for payment');
    }
  
     await queryInterface.bulkInsert('Orders', [
        {
            tanggalPembelian: new Date(),
            userId: 1,
            eventId: 1,
            totalTickets: 5,
            totalPay: '30000000',
            status: 'lunas',
            ticketsTypes: 'Offline',
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
        await queryInterface.bulkDelete('Orders', null, {});
        await queryInterface.bulkDelete('Users', null, {});
    } catch (err) {
        console.error('Error in afterAll:', err);
    }
});

describe('Initial Payment', () => {
    test('Should initiate a payment for an event', async () => {
        const totalTickets = 2; 

        const response = await request(app)
            .post(`/api/orders/initialPayment/${eventId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ totalTickets });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Token generated successfully');
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('paymentUrl');

    });
});

describe('Create Order', () => {
    test('Should create an order for an event', async () => {
        const orderData = {
            eventId: eventId,
            totalTickets: 3,
            ticketsTypes: 'Online'
        };

        const response = await request(app)
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${token}`)
            .send(orderData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Order created');
        expect(response.body).toHaveProperty('order');
    });
});

describe('Get My Orders', () => {
    test('Should retrieve orders made by the user', async () => {
        const response = await request(app)
            .get('/api/orders/getMyOrder')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBeTruthy();
        response.body.data.forEach(order => {
            expect(order.userId).toEqual(userId);
        });
    });
});

