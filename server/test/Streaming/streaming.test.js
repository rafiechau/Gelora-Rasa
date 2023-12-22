// const request = require('supertest');
// const app = require('../../index');
// const { sequelize } = require('../../models/index');
// const { queryInterface } = sequelize;
// const { createToken } = require('../../utils/jwt');
// const nodemailer = require('nodemailer');
// jest.mock('nodemailer');

// const dummyUser = {
//     firstName: 'Test User',
//     lastName: 'last',
//     email: 'testuser@example.com',
//     password: 'password',
//     confirmPassword: 'password',
//     role: 1,
// };
  
// let token;
// let userId;

// beforeAll((done) => {
//     request(app)
//     .post('/api/auth/register')
//     .send(dummyUser)
//     .then((response) => { 
//       if (response && response.body && response.body.data.id) {
//         const dataUser = {
//           id: response.body.data.id,
//           firstName: response.body.data.firstName,
//           lastName: response.body.data.lastName,
//           email: response.body.data.email,
//           role: response.body.data.role,
//         };
//         token = createToken(dataUser);
//         userId = response.body.data.id
//       } else {
//         throw new Error('Invalid response body structure');
//       }
//     })
//     .then(() => done())
//     .catch((err) => {
//       console.error('Error in beforeAll:', err);
//       done(err)
//     })
// })
  
// afterAll((done) => {
//     Promise.all([
//       queryInterface.bulkDelete('Users', null, {}),
//       queryInterface.bulkDelete('Livestreamings', null, {})
//     ])
//     .then(() => {
//       done()
//     })
//     .catch((err) => {
//       done(err)
//     })
// })

// const sendMailMock = jest.fn();
// nodemailer.createTransport.mockReturnValue({
//   sendMail: sendMailMock,
// });

// describe('Send Meeting ID to User', () => {

//     const dummyEventId = 1;
//     const dummyMeetingId = 'meeting123';

//     beforeEach(() => {
//         sendMailMock.mockClear();
//         nodemailer.createTransport.mockClear();
//     });

//     test('Success send meeting ID to users', async () => {
//         sendMailMock.mockResolvedValue(true);

//         const response = await request(app)
//             .post('/api/streaming/send-meeting')
//             .send({ eventId: dummyEventId, meetingId: dummyMeetingId })
//             .set('authorization', `Bearer ${token}`);

//         expect(response.status).toBe(200);
//         expect(response.body.message).toContain('Meeting ID has been sent to user email');
//         expect(sendMailMock).toHaveBeenCalledTimes(1); // Adjust this based on number of emails you expect to send
//     });

//     // test('Fails when email sending fails', async () => {
//     //     sendMailMock.mockRejectedValue(new Error('Email failed'));

//     //     const response = await request(app)
//     //         .post('/api/streaming/send-meeting')
//     //         .send({ eventId: dummyEventId, meetingId: dummyMeetingId })
//     //         .set('authorization', `Bearer ${token}`);

//     //     expect(response.status).toBe(200); // Assuming your API still returns 200 but with a failure message
//     //     expect(response.body.message).toContain('Email for meeting id failed to send');
//     //     expect(sendMailMock).toHaveBeenCalledTimes(1); // Adjust this based on number of emails you expect to send
//     // });
// });