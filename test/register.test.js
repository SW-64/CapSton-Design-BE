import request from 'supertest';
import app from '../src/app.js'; // app.js 경로에 맞게 수정

/*
afterAll(() => {
    server.close(); // 서버 닫기
    });
*/

describe('회원 가입 테스트', () => {
    it('회원가입 성공시 201', async () => {
    const response = await request(app).post('/api/auth/sign-up').send({
        name: 'play3',
        email: 'play3@example.com',
        password: 'StrongPass123!',
        passwordConfirm: 'StrongPass123!',
        nickname: 'play3',
    });

    console.log('Response Status:', response.status);
    console.log('Response Message:', response.body.message);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('회원가입 성공');
    });
});
