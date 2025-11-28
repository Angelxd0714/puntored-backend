import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';

describe('Charges E2E', () => {
    let app: INestApplication;
    let accessToken: string;
    let userId: string;
    let chargeId: string;
    const testUsername = `charge_test_${Date.now()}`;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider('NOTIFICATIONS_SERVICE')
            .useValue({
                emit: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
                connect: jest.fn(),
                close: jest.fn(),
            })
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
        await app.init();

        const registerRes = await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                username: testUsername,
                password: 'password123',
            })
            .expect(201);

        accessToken = registerRes.body.accessToken;
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST /recharges/buy', () => {
        it('201 - should create a new charge', async () => {
            const response = await request(app.getHttpServer())
                .post('/recharges/buy')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    phoneNumber: '3001234567',
                    amount: 10000,
                    description: 'Test recharge',
                })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.phoneNumber).toBe('3001234567');
            expect(response.body.amount).toBe(10000);
            expect(response.body.status).toBe('PENDING');

            chargeId = response.body.id;
        });

        it('400 - invalid phone number', async () => {
            await request(app.getHttpServer())
                .post('/recharges/buy')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    phoneNumber: '123',
                    amount: 10000,
                    description: 'Test recharge',
                })
                .expect(400);
        });

        it('400 - invalid amount (too low)', async () => {
            await request(app.getHttpServer())
                .post('/recharges/buy')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    phoneNumber: '3001234567',
                    amount: 100,
                    description: 'Test recharge',
                })
                .expect(400);
        });

        it('401 - unauthorized without token', async () => {
            await request(app.getHttpServer())
                .post('/recharges/buy')
                .send({
                    phoneNumber: '3001234567',
                    amount: 10000,
                    description: 'Test recharge',
                })
                .expect(401);
        });
    });

    describe('GET /recharges/history', () => {
        it('200 - should return user charges', async () => {
            const response = await request(app.getHttpServer())
                .get('/recharges/history')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
        });

        it('401 - unauthorized without token', async () => {
            await request(app.getHttpServer())
                .get('/recharges/history')
                .expect(401);
        });
    });

    describe('GET /recharges/history/:id', () => {
        it('200 - should return a specific charge', async () => {
            const response = await request(app.getHttpServer())
                .get(`/recharges/history/${chargeId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);

            expect(response.body.id).toBe(chargeId);
        });

        it('404 - charge not found', async () => {
            await request(app.getHttpServer())
                .get('/recharges/history/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(404);
        });
    });

    describe('PUT /recharges/:id', () => {
        it('200 - should update a charge', async () => {
            const response = await request(app.getHttpServer())
                .put(`/recharges/${chargeId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    description: 'Updated description',
                })
                .expect(200);

            expect(response.body.description).toBe('Updated description');
        });
    });

    describe('DELETE /recharges/:id', () => {
        it('200 - should delete a charge', async () => {
            await request(app.getHttpServer())
                .delete(`/recharges/${chargeId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
        });

        it('404 - should not find deleted charge', async () => {
            await request(app.getHttpServer())
                .get(`/recharges/history/${chargeId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(404);
        });
    });
});
