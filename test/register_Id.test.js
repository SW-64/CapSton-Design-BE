import request from 'supertest';
import app from '../src/app.js'; // app.js 경로에 맞게 수정

describe('회원 가입 테스트', () => {
    it('회원가입 성공시 201', async () => {
    const response = await request(app).post('/api/auth/sign-up').send({
        name: 'play5',
        email: 'play5@example.com',
        password: 'StrongPass123!',
        passwordConfirm: 'StrongPass123!',
        nickname: 'play5',
    });

    console.log('Response Status:', response.status);
    console.log('Response Message:', response.body.message);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('회원가입 성공');
    });
});
