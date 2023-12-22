const CryptoJS = require("crypto-js");
const request = require('supertest');
const app = require('../../index');
const { sequelize } = require('../../models/index');
const { queryInterface } = sequelize;
const nodemailer = require('nodemailer');
const { hashPassword } = require("../../utils/bycrpt");
const path = require("path");
const jwt = require('jsonwebtoken');
const { createTokenForForgetPassword } = require("../../utils/jwt");

jest.mock('nodemailer');

let otpToken;
let token;

const password = '12345678';
const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTOJS_SECRET).toString();

beforeAll(async () => {
  try {
    const hashedPassword1 = await hashPassword("12345678");
    const hashedPassword2 = await hashPassword("12345678");
    const hashedPassword3 = await hashPassword("12345678");
    // const encryptedPassword3 = CryptoJS.AES.encrypt('password3', process.env.CRYPTOJS_SECRET).toString();

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Dummy1',
        lastName: 'User1',
        email: 'dummy1@example.com',
        password: hashedPassword1,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dummy2',
        lastName: 'User2',
        email: 'dummy2@example.com',
        password: hashedPassword2,
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dummy3',
        lastName: 'User3',
        email: 'dummy3@example.com',
        password: hashedPassword3,
        role: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dummy4',
        lastName: 'User4',
        email: 'dummy4@example.com',
        password: hashedPassword3,
        role: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  } catch (err) {
    throw err;
  }
});



afterAll((done) => {
  queryInterface.bulkDelete('Users', null, {})
  .then(() => done())
  .catch((err) => done(err));
});


describe('Register User', () => {
  
  const password = "password123"
  const confirmPassword = "password123"

  const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTOJS_SECRET).toString();
  const encryptedConfirmPassword = CryptoJS.AES.encrypt(confirmPassword, process.env.CRYPTOJS_SECRET).toString();

  test('Success register user with status 201', (done) => {
    const newUser = {
      firstName: 'John ',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: encryptedPassword,
      confirmPassword: encryptedConfirmPassword,
    };
    request(app)
    .post('/api/auth/register')
    .send(newUser)
    .then(response => {
      expect(response.status).toBe(201);
      expect(response.body.message).toEqual(`Registration successful for ${response.body.data.firstName}`);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  const password2 = "password123"
  const confirmPassword2 = "password321"

  const encryptedPassword2 = CryptoJS.AES.encrypt(password2, process.env.CRYPTOJS_SECRET).toString();
  const encryptedConfirmPassword2 = CryptoJS.AES.encrypt(confirmPassword2, process.env.CRYPTOJS_SECRET).toString();

  test('Failed register user with password mismatch', (done) => {
    const newUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@example.com',
      password: encryptedPassword2 ,
      confirmPassword: encryptedConfirmPassword2
    };
    request(app)
    .post('/api/auth/register')
    .send(newUser)
    .then(response => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('Password and Confirm Password do not match');
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

});

const sendMailMock = jest.fn();
nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

describe('Verify Email', () => {
  beforeEach(() => {
    sendMailMock.mockClear();
    nodemailer.createTransport.mockClear();
  });

  test('OTP sent successfully', async () => {
    const email = 'newuser@example.com';  //email belum ada di db
    sendMailMock.mockResolvedValue(true);

    const response = await request(app)
      .post('/api/auth/verify-email')
      .send({ email });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('OTP sent to email');
  });

  test('Email already exists', async () => {
    const email = 'dummy2@example.com'; //email udah ada di db

    const response = await request(app)
      .post('/api/auth/verify-email')
      .send({ email });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('User with that email already existed');
  });
});

// ... (kode sebelumnya)

describe('Check OTP Verify Email', () => {

  beforeEach(async () => {
    const email = 'newuser@example.com'; 
    const response = await request(app)
      .post('/api/auth/verify-email')
      .send({ email });

    otpToken = response.body.data.token; 
  });

  function getOtpFromToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY_VERIFY_EMAIL);
      return decoded.otp;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


  test('Success verify with correct OTP', async () => {
    const otp = getOtpFromToken(otpToken);
    console.log("ini otp yang di decoded")
    const response = await request(app)
      .post('/api/auth/check-otp')
      .send({ otp, token: otpToken });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('success verify');
  });

  test('Fail verify with incorrect OTP', async () => {
    const incorrectOtp = '0000'; // OTP yang salah
    const response = await request(app)
      .post('/api/auth/check-otp')
      .send({ otp: incorrectOtp, token: otpToken })

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('OTP Invalid');
  });

  // test('Fail verify with email already existed', async () => {
  //   const existingEmail = 'newuser@example.com'; 
  //   const otpResponse = await request(app)
  //     .post('/api/auth/verify-email')
  //     .send({ email: existingEmail });
    
    
  //   const existingOtpToken = otpResponse.body.data.token;
  //   console.log(existingOtpToken, "existing otp token")

    
  //   const otp = getOtpFromToken(existingOtpToken);
  //   console.log(otp, "otp")
  //   const response = await request(app)
  //     .post('/api/auth/check-otp')
  //     .send({ otp, token: existingOtpToken });

  //   expect(response.status).toBe(400);
  //   expect(response.body.message).toEqual('user with that email already existed');
  // });
});


describe('Login', () => {
  const email = 'dummy3@example.com';
  const password = '12345678';

  // Encrypting the password as it would be in the actual request
  const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTOJS_SECRET).toString();

  test('Successful login', async () => {
    const response = await request(app)  
      .post('/api/auth/login')
      .send({ email, password: encryptedPassword });
    console.log(response.body, "ini di login")
    token = response.body.token;
    expect(response.status).toBe(200); // assuming 200 is the success status
    expect(response.body.message).toBe('Login success');
    expect(response.body).toHaveProperty('token');
  });

  test('Failed login with incorrect password', async () => {
    const wrongEncryptedPassword = CryptoJS.AES.encrypt('wrongpassword', process.env.CRYPTOJS_SECRET).toString();

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email, password: wrongEncryptedPassword });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('invalid email or password');
  });

});

describe('Forgot Password', () => {
  beforeEach(() => {
    sendMailMock.mockClear();
    nodemailer.createTransport.mockClear();
  });

  test('Email sent successfully for existing user', async () => {
    const email = 'dummy1@example.com'; 
    sendMailMock.mockResolvedValue({ accepted: [email] });

    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Check your email for forgot password');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  test('Email not sent for non-existing user', async () => {
    const email = 'nonexistinguser@example.com';  

    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email });

    expect(response.status).toBe(404);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  test('Failed to send email', async () => {
    const email = 'dummy1@example.com';  
    sendMailMock.mockResolvedValue({ accepted: [] });

    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Email for forgot password failed to sent');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });
});

describe('Reset Password', () => {
  let userTokenResetPassword; 

  beforeAll(async () => {
    // Assuming you have a function to create a token for a user
    // Replace 'validUserEmail' with an email that exists in your test DB
    userTokenResetPassword = createTokenForForgetPassword('dummy1@example.com');
  });

  test('Successfully reset password', async () => {
    const newPassword = 'newStrongPassword123';
    const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, process.env.CRYPTOJS_SECRET).toString();

    const response = await request(app)
      .put('/api/auth/reset-password')
      .send({ 
        new_password: encryptedNewPassword, 
        token: userTokenResetPassword 
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Success reset password');
  });

  // test('Failed reset with invalid token', async () => {
  //   const newPassword = 'newStrongPassword123';
  //   const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, process.env.CRYPTOJS_SECRET).toString();

  //   const response = await request(app)
  //     .put('/api/auth/reset-password')
  //     .send({ 
  //       new_password: encryptedNewPassword, 
  //       token: token 
  //     });

  //   expect(response.status).toBe(400);
  //   expect(response.body.message).toEqual('Invalid or expired token');
  //   console.log(response, "ini response")
  // });

  // test('Failed reset for non-existing user', async () => {
  //   const newPassword = 'newStrongPassword123';
  //   const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, process.env.CRYPTOJS_SECRET).toString();

  //   const response = await request(app)
  //     .put('/api/auth/reset-password')
  //     .send({ new_password: encryptedNewPassword, token: token });

  //   expect(response.status).toBe(404);
  //   expect(response.body.message).toEqual('User not found');
  // });

});

describe('Get Profile', () => {

  test('Success get user profile', async () => {
    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('success');
    expect(response.body.data).toHaveProperty('firstName', 'Dummy3');
    expect(response.body.data).toHaveProperty('lastName', 'User3');
    expect(response.body.data).toHaveProperty('email', 'dummy3@example.com');
  });

  test('Failed get user profile for unauthorized user', async () => {
    const response = await request(app)
      .get('/api/auth/profile');

    expect(response.status).toBe(403);
  });
});



describe('Edit Profile', () => {
  // Pastikan token telah didapatkan dari proses login
  test('Success edit user profile', async () => {
    const updatedData = {
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName'
    };

    const response = await request(app)
      .put('/api/auth/edit/profile')
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('success edit profile');
    expect(response.body.data).toHaveProperty('firstName', 'UpdatedFirstName');
    expect(response.body.data).toHaveProperty('lastName', 'UpdatedLastName');
  });

  test('Failed edit profile for unauthorized user', async () => {
    const updatedData = {
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName'
    };

    const response = await request(app)
      .put('/api/auth/edit/profile')
      .send(updatedData);

    expect(response.status).toBe(403);
  });

  test('Failed edit profile with invalid data', async () => {
    const invalidData = {
      firstName: '', 
    };

    const response = await request(app)
      .put('/api/auth/edit/profile')
      .send(invalidData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('\"firstName\" is not allowed to be empty');
  });

});

describe('Edit Photo Profile', () => {
  const imagePath = path.join(__dirname, '..', '..', 'uploads', '1702228214323.jpeg');

  afterEach(() => {
    jest.clearAllMocks(); 
  });
  test('Success edit photo profile', async () => {
    // Adjust the path according to your actual directory structure
    

    console.log(imagePath, "testttt")

    const response = await request(app)
      .put('/api/auth/edit/photoProfile')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', imagePath); 

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('success edit photo profile');
    expect(response.body.data).toHaveProperty('imagePath');
  });

  // test('Failed edit photo profile for unauthorized user', async () => {
  //   const response = await request(app)
  //     .put('/api/auth/edit/photoProfile')
  //     .attach('image', imagePath); 

  //   console.log(response, "ini responseee");
  //   expect(response.status).toBe(403);
  // });

  test('Failed edit photo profile with no image provided', async () => {
    const response = await request(app)
      .put('/api/auth/edit/photoProfile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Image Not Found');
  });
});

describe('GET /all-users', () => {
  test('Should get all users by admin', async () => {
    const response = await request(app)
      .get('/api/auth/all-users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('success');
  });

});

describe('DELETE /delete-user-by-admin/:userId', () => {
  let adminToken;
  let nonAdminToken;
  let userIdToDelete;

  const confirmPassword = "12345678"

  const encryptedConfirmPassword = CryptoJS.AES.encrypt(confirmPassword, process.env.CRYPTOJS_SECRET).toString();

  const newUser = {
    firstName: 'John2 ',
    lastName: 'Doe',
    email: 'johndoe2@example.com',
    password: encryptedPassword,
    confirmPassword: encryptedConfirmPassword,
  };

  beforeAll(async () => {
    // Login as admin
    const adminLoginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'dummy3@example.com', password: encryptedPassword });
    console.log(adminLoginResponse)
    adminToken = adminLoginResponse.body.token;

    // Login as non-admin
    const nonAdminLoginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'dummy4@example.com', password: encryptedPassword });
    nonAdminToken = nonAdminLoginResponse.body.token;

    // Create a user to delete
    const createUserResponse = await request(app)
      .post('/api/auth/register')
      .send(newUser);
    userIdToDelete = createUserResponse.body.data.id;
  });

  console.log(adminToken, "ini tokena admin log")
  test('Successful deletion by admin', async () => {
    console.log(adminToken, "ini admin token")
    const response = await request(app)
      .delete(`/api/auth/delete-user-by-admin/${userIdToDelete}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('User successfully deleted.');
  });

  test('Unauthorized deletion attempt by non-admin user', async () => {
    const response = await request(app)
      .delete(`/api/auth/delete-user-by-admin/${userIdToDelete}`)
      .set('Authorization', `Bearer ${nonAdminToken}`);

    expect(response.status).toBe(403);
  });

  test('Attempt to delete a non-existing user', async () => {
    const response = await request(app)
      .delete('/api/auth/delete-user-by-admin/nonExistingUserId')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toContain('not found or you\'re not authorized to delete this event');
  });

});

describe('DELETE /delete-account', () => {

  test('Successful account deletion', async () => {
    const response = await request(app)
      .delete('/api/auth/delete-account')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('User successfully deleted.');
  });

  test('Failed deletion due to unauthorized user', async () => {
    const response = await request(app)
      .delete('/api/auth/delete-account');

    expect(response.status).toBe(403); 
  });

});







