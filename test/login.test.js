import request from 'supertest';
import  app  from '../src/app.js'; // app.js 경로에 맞게 수정

describe('로그인 테스트', () => {
  beforeAll(async () => {
    // 테스트용 계정 생성
    await request(app).post('/api/auth/sign-up').send({
      name: 'testuser',
      email: 'testuser@example.com',
      password: 'TestPass123!',
      passwordConfirm: 'TestPass123!',
      nickname: 'tester',
    });
  });

  afterAll(async () => {
    // 테스트 데이터 정리
    await request(app).delete('/api/auth/delete-test-user').send({
      email: 'testuser@example.com',
    });
  });

  it('로그인 성공시 200', async () => {
    const response = await request(app).post('/api/auth/sign-in').send({
      email: 'testuser@example.com',
      password: 'TestPass123!',
    });

    console.log('Response Status:', response.status);
    console.log('Response Token:', response.body.data?.token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('로그인 성공');
    expect(response.body.data).toHaveProperty('token'); // 응답에 토큰이 있는지 확인
  });

  it('유효하지 않은 사용자 접속시 400', async () => {
    const response = await request(app).post('/api/auth/sign-in').send({
      email: 'testuser@example.com',
      password: 'WrongPassword123!',
    });

    console.log('Response Status:', response.status);
    console.log('Response Message:', response.body.message);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('사용자 정보 틀림');
  });
});
