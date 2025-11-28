// src/auth/__tests__/auth.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';

describe('Auth E2E', () => {
    let app: INestApplication;
    let accessToken: string;
    const testUsername = `test_${Date.now()}`;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
        await app.init();

        // Register first user for tests
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

    describe('POST /auth/register', () => {
        it('201 - should register new user', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                    username: `newuser_${Date.now()}`,
                    password: 'password123',
                })
                .expect(201);

            expect(response.body).toHaveProperty('accessToken');
        });

        it('400 - duplicate username', async () => {
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                    username: testUsername,
                    password: 'password123'
                })
                .expect(400);
        });

        it('400 - password too short', async () => {
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                    username: `short_${Date.now()}`,
                    password: '123'
                })
                .expect(400);
        });

        it('400 - missing username', async () => {
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                    password: 'password123'
                })
                .expect(400);
        });

        it('400 - missing password', async () => {
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                    username: `nopass_${Date.now()}`
                })
                .expect(400);
        });
    });

    describe('POST /auth/login', () => {
        it('201 - should login successfully', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: testUsername,
                    password: 'password123'
                })
                .expect(201);

            expect(response.body).toHaveProperty('accessToken');
        });

        it('401 - invalid credentials (wrong password)', async () => {
            await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: testUsername,
                    password: 'wrongpassword'
                })
                .expect(401);
        });

        it('401 - invalid credentials (non-existent user)', async () => {
            await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: 'nonexistentuser',
                    password: 'password123'
                })
                .expect(401);
        });
    });
});
