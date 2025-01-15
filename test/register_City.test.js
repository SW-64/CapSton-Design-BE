import request from 'supertest';
import app from '../src/app.js'; // app.js 경로 확인

describe('명소 등록 테스트', () => {
  let token;

  // 로그인하여 JWT 토큰 가져오기
  beforeAll(async () => {
    const loginResponse = await request(app).post('/api/auth/sign-in').send({
      email: 'play4@example.com', // 테스트용 사용자 이메일
      password: 'StrongPass123!', // 테스트용 사용자 비밀번호
    });

    token = loginResponse.body.data; // 로그인 성공 시 반환된 토큰 저장
  });

  it('명소 등록 성공 시 201 응답 및 데이터 반환', async () => {
    const response = await request(app)
      .post('/api/1/districts/1/spots') // 올바른 경로
      .set('Authorization', `Bearer ${token}`) // JWT 토큰 추가
      .field('spotName', '테스트 명소') // Body 필드 추가
      .attach('image', Buffer.from('dummy image content'), {
        filename: 'test-image.jpg',
        contentType: 'image/jpeg',
      });

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('명소 등록 성공');
    expect(response.body.data).toBeDefined();
    expect(response.body.data.spotName).toBe('테스트 명소');
  });
});
