# Gelorasa API Documentation

## Authentication

### Register
- **Endpoint**: `/auth/register`
- **Method**: POST
- **Body**:
  - `email`: String
  - `password`: String (encrypted)
  - `confirmPassword`: String (encrypted)
  - `role`: Integer (optional)

### Verify Email
- **Endpoint**: `/auth/verify-email`
- **Method**: POST
- **Body**:
  - `email`: String

### Check OTP for Email Verification
- **Endpoint**: `/auth/check-otp`
- **Method**: POST
- **Body**:
  - `otp`: String

### Login
- **Endpoint**: `/auth/login`
- **Method**: POST
- **Body**:
  - `email`: String
  - `password`: String (encrypted)

### Forgot Password
- **Endpoint**: `/auth/forgot-password`
- **Method**: POST
- **Body**:
  - `email`: String

### Reset Password
- **Endpoint**: `/auth/reset-password`
- **Method**: PUT
- **Body**:
  - `new_password`: String (encrypted)

## User Profile

### Get User Profile
- **Endpoint**: `/auth/profile`
- **Method**: GET

### Edit User Profile
- **Endpoint**: `/auth/edit/profile`
- **Method**: PUT
- **Body**:
  - Profile data fields

### Edit User Profile Photo
- **Endpoint**: `/auth/edit/photoProfile`
- **Method**: PUT
- **FormData**:
  - `image`: File

### Get All Users (Admin Only)
- **Endpoint**: `/auth/all-users`
- **Method**: GET
- **Query Parameters**:
  - `page`: Integer
  - `pageSize`: Integer

### Delete User by Admin
- **Endpoint**: `/auth/delete-user-by-admin/:userId`
- **Method**: DELETE

### Delete User Account
- **Endpoint**: `/auth/delete-account`
- **Method**: DELETE

## Categories

### Create Category
- **Endpoint**: `/categories/create`
- **Method**: POST
- **Body**:
  - `categoryName`: String

### Get All Categories
- **Endpoint**: `/categories/`
- **Method**: GET

### Update Category
- **Endpoint**: `/categories/update/:categoryId`
- **Method**: PUT
- **Body**:
  - Category data fields

### Delete Category
- **Endpoint**: `/categories/delete/:categoryId`
- **Method**: DELETE

## Events

### Create Event
- **Endpoint**: `/events/create`
- **Method**: POST
- **FormData**:
  - Event data fields

### Get All Events
- **Endpoint**: `/events/`
- **Method**: GET

### Get Detail of an Event
- **Endpoint**: `/events/detail/:eventId`
- **Method**: GET

### Update Event
- **Endpoint**: `/events/update/:eventId`
- **Method**: PUT
- **FormData**:
  - Event data fields

### Update Event Status
- **Endpoint**: `/events/update-status/:eventId`
- **Method**: PUT

### Delete an Event
- **Endpoint**: `/events/delete/:eventId`
- **Method**: DELETE

## Location

### Create Location
- **Endpoint**: `/location/create`
- **Method**: POST
- **Body**:
  - `namaProvinsi`: String

### Get All Locations
- **Endpoint**: `/location/`
- **Method**: GET

### Update Location
- **Endpoint**: `/location/update/:locationId`
- **Method**: PUT
- **Body**:
  - Location data fields

### Delete Location
- **Endpoint**: `/location/delete/:locationId`
- **Method**: DELETE

## Orders

### Create Order
- **Endpoint**: `/orders/create`
- **Method**: POST
- **Body**:
  - `eventId`: Integer
  - `totalTickets`: Integer
  - `ticketsTypes`: String

### Get My Orders
- **Endpoint**: `/orders/getMyOrder`
- **Method**: GET

### Delete My Order
- **Endpoint**: `/orders/delete/:orderId`
- **Method**: DELETE

### Initial Payment
- **Endpoint**: `/orders/initialPayment/:eventId`
- **Method**: POST
- **Body**:
  - `totalTickets`: Integer

## Streaming

### Send Meeting ID to User
- **Endpoint**: `/streaming/send-meeting`
- **Method**: POST
- **Body**:
  - `eventId`: Integer
  - `meetingId`: String

### Verify User for Meeting
- **Endpoint**: `/streaming/verify-user-for-meeting`
- **Method**: POST
- **Body**:
  - `eventId`: Integer

---

This documentation covers the main endpoints for the Gelorasa API. Each endpoint has specified the HTTP method, expected request body, and a brief description. Replace placeholders like `:userId`, `:eventId`, `:categoryId`, and `:locationId` with actual values as required.
