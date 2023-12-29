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
let eventId;
let userId;
let dummyMeetingId = '123456789';

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
        await queryInterface.bulkDelete('Events', null, {});
        await queryInterface.bulkDelete('Users', null, {});
    } catch (err) {
        console.error('Error in afterAll:', err);
    }
});

describe('Send Meeting ID to User', () => {
        test('Success sending meeting ID to user', async () => {
            const response = await request(app)
            .post('/api/streaming/send-meeting')
            .send({ eventId: eventId, meetingId: dummyMeetingId })
            .set('authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toContain("Meeting ID has been sent to user email");
    });

    test('Fails sending meeting ID due to invalid event ID', async () => {
        const invalidEventId = 'nonexistent';
        const response = await request(app)
            .post('/api/streaming/send-meeting')
            .send({ eventId: invalidEventId, meetingId: dummyMeetingId })
            .set('authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(500);
    });

});

describe('Verify User For Meeting', () => {
    test('Should verify user for a meeting if they have an order for the event', async () => {
        await queryInterface.bulkInsert('Orders', [{
            tanggalPembelian: new Date(),
            userId: userId,
            eventId: eventId,
            totalTickets: 1,
            totalPay: '100000',
            status: 'lunas',
            ticketsTypes: 'Online',
            createdAt: new Date(),
            updatedAt: new Date(),
        }]);

        const response = await request(app)
            .post('/api//streaming/verify-user-for-meeting')
            .set('Authorization', `Bearer ${token}`)
            .send({ eventId });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('isValid', true);

        await queryInterface.bulkDelete('Orders', { userId: userId, eventId: eventId });
    });

    test('Should not verify user for a meeting if they do not have an order for the event', async () => {
        const invalidEventId = 'nonexistent';
        const response = await request(app)
            .post('/api/streaming/verify-user-for-meeting')
            .set('Authorization', `Bearer ${token}`)
            .send({ eventId: invalidEventId });

        // Periksa response
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('isValid', false);
    });
});

