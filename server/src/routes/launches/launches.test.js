const request = require('supertest');
const app = require('../../app');
const { connectToMongoDB, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
    beforeAll(async () => {
        await connectToMongoDB();
    });
    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /launches', () => {
        const completeLaunchData = {
            mission: 'Hopp',
            rocket: 'SIGMA2',
            launchDate: 'June 26, 2038',
            target: 'Kepler-1652 b'
        };
        const launchDataWithoutDate = {
            mission: 'Hopp',
            rocket: 'SIGMA2',
            target: 'Kepler-1652 b'
        };
        const launchDataWithInvalidDate = {
            mission: 'Hopp',
            rocket: 'SIGMA2',
            launchDate: 'hello',
            target: 'Kepler-1652 b'
        }
        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(launchDataWithoutDate)
        });
        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400)
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            })
        });
        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400)
            expect(response.body).toStrictEqual({
                error: 'Invalid Date'
            })
        });
    });
    afterAll(async () => {
        await mongoDisconnect();
    })
});

