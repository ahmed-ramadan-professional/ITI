process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.COOKIE_NAME = 'logforge_token';

const request = require('supertest');
const app = require('../../src/app');
const Application = require('../../src/models/Application');
const Log = require('../../src/models/Log');
const { connectTestDb, cleanupTestDb, disconnectTestDb } = require('../helpers/db');

describe('API integration', () => {
  beforeAll(async () => {
    await connectTestDb();
  });

  afterEach(async () => {
    await cleanupTestDb();
  });

  afterAll(async () => {
    await disconnectTestDb();
  });

  it('handles auth lifecycle and protected route access', async () => {
    const registerRes = await request(app).post('/api/users/register').send({
      username: 'alice',
      email: 'alice@example.com',
      password: 'Password123'
    });

    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body.developer.apiKey).toBeDefined();
    expect(registerRes.headers['set-cookie']).toBeDefined();

    const meRes = await request(app)
      .get('/api/users/me')
      .set('Cookie', registerRes.headers['set-cookie']);

    expect(meRes.statusCode).toBe(200);
    expect(meRes.body.developer.email).toBe('alice@example.com');

    const logoutRes = await request(app)
      .post('/api/users/logout')
      .set('Cookie', registerRes.headers['set-cookie']);

    expect(logoutRes.statusCode).toBe(200);

    const blockedRes = await request(app).get('/api/applications');
    expect(blockedRes.statusCode).toBe(401);
  });

  it('restricts applications by owner and enforces unique names', async () => {
    const devA = await request(app).post('/api/users/register').send({
      username: 'devA',
      email: 'deva@example.com',
      password: 'Password123'
    });

    const devB = await request(app).post('/api/users/register').send({
      username: 'devB',
      email: 'devb@example.com',
      password: 'Password123'
    });

    const createRes = await request(app)
      .post('/api/applications')
      .set('Cookie', devA.headers['set-cookie'])
      .send({ name: 'my-app' });

    expect(createRes.statusCode).toBe(201);

    const conflictRes = await request(app)
      .post('/api/applications')
      .set('Cookie', devB.headers['set-cookie'])
      .send({ name: 'my-app' });

    expect(conflictRes.statusCode).toBe(409);

    const hiddenRes = await request(app)
      .get('/api/applications/my-app')
      .set('Cookie', devB.headers['set-cookie']);

    expect(hiddenRes.statusCode).toBe(404);
  });

  it('ingests logs with API key and supports log querying + analytics', async () => {
    const dev = await request(app).post('/api/users/register').send({
      username: 'owner',
      email: 'owner@example.com',
      password: 'Password123'
    });

    const cookie = dev.headers['set-cookie'];
    const apiKey = dev.body.developer.apiKey;

    await request(app).post('/api/applications').set('Cookie', cookie).send({ name: 'shop-app' });

    const unauthorizedLog = await request(app)
      .post('/api/applications/shop-app/logs')
      .send({ message: 'Payment failed', level: 'ERROR' });
    expect(unauthorizedLog.statusCode).toBe(401);

    await request(app)
      .post('/api/applications/shop-app/logs')
      .set('x-api-key', apiKey)
      .send({ message: 'Payment failed', level: 'ERROR' });

    await request(app)
      .post('/api/applications/shop-app/logs')
      .set('x-api-key', apiKey)
      .send({ message: 'Payment failed', level: 'ERROR' });

    await request(app)
      .post('/api/applications/shop-app/logs')
      .set('x-api-key', apiKey)
      .send({ message: 'Cache warning', level: 'WARN' });

    const storedLog = await Log.findOne({ message: 'Payment failed', level: 'ERROR' }).lean();
    expect(storedLog.count).toBe(2);

    const logsRes = await request(app)
      .get('/api/applications/shop-app/logs?sortBy=count&search=payment')
      .set('Cookie', cookie);

    expect(logsRes.statusCode).toBe(200);
    expect(logsRes.body.logs).toHaveLength(1);
    expect(logsRes.body.logs[0].count).toBe(2);

    const analyticsRes = await request(app)
      .get('/api/applications/shop-app/logs/analytics')
      .set('Cookie', cookie);

    expect(analyticsRes.statusCode).toBe(200);
    expect(analyticsRes.body.totalsByLevel.ERROR).toBe(2);
    expect(analyticsRes.body.totalsByLevel.WARN).toBe(1);
    expect(Array.isArray(analyticsRes.body.dailySeries)).toBe(true);
  });

  it('rejects API key usage when app belongs to another developer', async () => {
    const devA = await request(app).post('/api/users/register').send({
      username: 'devA',
      email: 'deva2@example.com',
      password: 'Password123'
    });
    const devB = await request(app).post('/api/users/register').send({
      username: 'devB',
      email: 'devb2@example.com',
      password: 'Password123'
    });

    await request(app)
      .post('/api/applications')
      .set('Cookie', devA.headers['set-cookie'])
      .send({ name: 'billing-app' });

    const postRes = await request(app)
      .post('/api/applications/billing-app/logs')
      .set('x-api-key', devB.body.developer.apiKey)
      .send({ message: 'bad key owner', level: 'INFO' });

    expect(postRes.statusCode).toBe(403);

    const appDoc = await Application.findOne({ name: 'billing-app' }).lean();
    expect(appDoc).toBeTruthy();
  });
});