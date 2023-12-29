# Client Gelorasa

## API Integration

urls: http://localhost:5000/api/

| API Function                   | Method   | API Endpoint                                      | Description                                        |
|--------------------------------|----------|---------------------------------------------------|----------------------------------------------------|
| `ping`                         | GET      | `urls.ping`                                       | Ping the server                                    |
| `apiHandleRegister`            | POST     | `${urls.auth}/register`                           | Register a new user                                |
| `apiHandleSendVerifyEmail`     | POST     | `${urls.auth}/verify-email`                       | Send verification email                            |
| `apiHandleCheckOtpVerifyEmail` | POST     | `${urls.auth}/check-otp`                          | Check OTP for email verification                  |
| `apiHandleLogin`               | POST     | `${urls.auth}/login`                              | User login                                         |
| `apiHandleSendForgotPassword`  | POST     | `${urls.auth}/forgot-password`                    | Send forgot password request                       |
| `apiHandleResetForgotPassword` | PUT      | `${urls.auth}/reset-password`                     | Reset forgotten password                           |
| `getAllUsersApi`               | GET      | `${urls.auth}/all-users?page={page}&pageSize={pageSize}` | Get all users with pagination               |
| `deleteUserByAdminApi`         | DELETE   | `${urls.auth}/delete-user-by-admin/{userId}`      | Delete a user by admin                             |
| `deleteAccountApi`             | DELETE   | `${urls.auth}/delete-account`                     | Delete account                                     |
| `apiHandleGetProfile`          | GET      | `${urls.auth}/profile`                            | Get user profile                                   |
| `apiHandleEditPhotoProfile`    | PUT      | `${urls.auth}/edit/photoProfile`                  | Edit user's profile photo                          |
| `apiHandleEditProfile`         | PUT      | `${urls.auth}/edit/profile`                       | Edit user profile                                  |
| `getEventApi`                  | GET      | `${urls.events}/?page={page}&pageSize={pageSize}` | Get events with pagination                         |
| `deleteEventByIdApi`           | DELETE   | `${urls.events}/delete/{eventId}`                 | Delete an event by its ID                          |
| `createEventApi`               | POST     | `${urls.events}/create`                           | Create a new event                                 |
| `updateEventByIdApi`           | PUT      | `${urls.events}/update/{eventId}`                 | Update an event by its ID                          |
| `updateStatusEventByIdApi`     | PUT      | `${urls.events}/update-status/{eventId}`          | Update the status of an event by its ID            |
| `getEventByIdApi`              | GET      | `${urls.events}/detail/{eventId}`                 | Get details of an event by its ID                  |
| `getMyEventApi`                | GET      | `${urls.events}/myEvent`                          | Get events associated with the current user        |
| `initialPayementApi`           | POST     | `${urls.orders}/initialPayment/{eventId}`         | Initialize payment for an event                    |
| `createOrderEvent`             | POST     | `${urls.orders}/create`                           | Create a new order for an event                    |
| `hasUserOrderedEventApi`       | GET      | `${urls.orders}/check-order/{eventId}`            | Check if a user has ordered for an event           |
| `getAllUserOrderEvent`         | GET      | `${urls.orders}/get-order-user/{eventId}`         | Get all orders for a specific event                |
| `getMyOrdersApi`               | GET      | `${urls.orders}/getMyOrder`                       | Get all orders made by the current user            |
| `deleteMyOrderApi`             | DELETE   | `${urls.orders}/delete/{orderId}`                 | Delete an order made by the current user           |
| `createEventOrganizerApi`      | POST     | `${urls.eventOrganizer}/create`                   | Create a new event organizer                       |
| `getLocationApi`               | GET      | `${urls.location}/`                               | Get all locations                                  |
| `createLocationApi`            | POST     | `${urls.location}/create`                         | Create a new location                              |
| `updateLocationByIdApi`        | PUT      | `${urls.location}/update/{locationId}`            | Update a location by its ID                        |
| `deleteLocationByIdApi`        | DELETE   | `${urls.location}/delete/{locationId}`            | Delete a location by its ID                        |
| `getCategoriesApi`             | GET      | `${urls.categories}/`                             | Get all categories                                 |
| `createCategoryApi`            | POST     | `${urls.categories}/create`                       | Create a new category                              |
| `updateCategoryByIdApi`        | PUT      | `${urls.categories}/update/{categoryId}`          | Update a category by its ID                        |
| `deleteCategoryByIdApi`        | DELETE   | `${urls.categories}/delete/{categoryId}`          | Delete a category by its ID                        |
| `createMeetingIdAPI`           | POST     | `${urls.streaming}/send-meeting`                  | Create a meeting ID for streaming                  |
| `verifyUserForMeetingApi`      | POST     | `${urls.streaming}/verify-user-for-meeting`       | Verify a user for meeting access                   |
| `createMeeting`                | POST     | `https://api.videosdk.live/v2/rooms`               | Create a meeting room for streaming                |

---

Note: Replace `{page}`, `{pageSize}`, `{userId}`, `{eventId}`, `{orderId}`, `{locationId}`, and `{categoryId}` with actual values as needed.
