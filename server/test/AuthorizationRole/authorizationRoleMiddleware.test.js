const { authorizationRoleEventOrganizer, authorizationRoleStandardUser, authorizationRoleAdmin } = require('../../middlewares/AuthorizationRole');
const httpMocks = require('node-mocks-http');
const { handleResponse } = require('../../helper/handleResponseHelper');

jest.mock('../../helper/handleResponseHelper.js');

describe('authorizationRoleEventOrganizer Middleware', () => {
    it('should call next() if role is event organizer', async () => {
        const req = httpMocks.createRequest({
            role: 2, 
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await authorizationRoleEventOrganizer(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 if role is not event organizer', async () => {
        const req = httpMocks.createRequest({
            role: 1, 
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await authorizationRoleEventOrganizer(req, res, next);

        expect(handleResponse).toHaveBeenCalledWith(res, 403, expect.any(Object));
        expect(next).not.toHaveBeenCalled();
    });
});

describe('authorizationRoleStandardUser Middleware', () => {
    it('should call next() if role is standart user', async () => {
        const req = httpMocks.createRequest({
            role: 1, 
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await authorizationRoleStandardUser(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 if role is not standart user', async () => {
        const req = httpMocks.createRequest({
            role: 2, 
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await authorizationRoleStandardUser(req, res, next);

        expect(handleResponse).toHaveBeenCalledWith(res, 403, expect.any(Object));
        expect(next).not.toHaveBeenCalled();
    });
});

describe('authorizationRoleAdmin Middleware', () => {
    it('should call next() if role is Admin', async () => {
        const req = httpMocks.createRequest({
            role: 3, 
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await authorizationRoleAdmin(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 if role is not admin', async () => {
        const req = httpMocks.createRequest({
            role: 2, 
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await authorizationRoleAdmin(req, res, next);

        expect(handleResponse).toHaveBeenCalledWith(res, 403, expect.any(Object));
        expect(next).not.toHaveBeenCalled();
    });
});
