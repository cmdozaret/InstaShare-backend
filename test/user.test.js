const request = require('supertest');
const chai = (...args) => import('chai').then(({ default: chai }) => chai(...args));
const { expect } = chai;
const mysql = require('mysql2');
const sinon = require('sinon');
const app = require('../app');

describe('User API', () => {
    let dbQueryStub;
    let id = 1;

    // Set up a stub for the database query
    beforeEach(() => {
        dbQueryStub = sinon.stub(mysql.Connection.prototype, 'query');
    });

    afterEach(() => {
        // Restore the original method
        dbQueryStub.restore();
    });

    describe('GET /user', () => {
        it('should return an array of users', (done) => {
            const fakeUsers = [{ id: 1, name: 'johndoe', email: 'test@test.ts' }];
            dbQueryStub.yields(null, fakeUsers); // Simulate successful query

            request(app)
                .get('/user')
                .expect(200)
                .end(done);
        });

        it('should return a 500 error on database error', (done) => {
            dbQueryStub.yields(new Error('Database error')); // Simulate an error

            request(app)
                .get('/user')
                .expect(500)
                .end(done);
        });
    });

    describe('POST /user', () => {
        it('should create a new user and return it', (done) => {
            const newUser = { username: 'janedoe1', email: 'test1@test1.ts', password: 'password' };
            request(app)
                .post('/user')
                .send(newUser)
                .expect(201)
                .end(done);
        });

        it('should return a 400 error if name is missing', (done) => {
            request(app)
                .post('/user')
                .send({})
                .expect(400)
                .end(done);
        });
    });

    describe(`DELETE /user/:id`, () => {
        it('should return 401 if user is not logged in', (done) => {
            request(app)
                .delete(`/user/${id}`)
                .expect(401)
                .end(done);
        });

        it('should return an error when deleting a non-existing user due permissions', (done) => {
            request(app)
                .delete('/users/9999')
                .expect(404)
                .end(done);
        });
    });
});