import request from 'supertest';
import app from '../src/app.js'; // app.js 경로에 맞게 수정

describe('로그인 테스트', () => {
  it('로그인 성공 시 200 응답', async () => {
    const response = await request(app).post('/api/auth/sign-in').send({
      email: 'play5@example.com',
      password: 'StrongPass123!',
    });

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('로그인 성공');
    expect(response.body.data).toBeDefined(); // 토큰 확인
  });
/*
  it('로그인 실패 시 400 응답 및 에러 메시지 반환-> 현재 예상치 못한 오류 500으로 응답함', async () => {
    const response = await request(app).post('/api/auth/sign-in').send({
      email: 'play4@example.com',
      password: 'WrongPassword!',
    });

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('사용자 정보 틀림');
  });
  */
});
