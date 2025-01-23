import request from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/utils/prisma.util.js';

describe('명소 북마크 등록 테스트', () => {
  let token;

  // 로그인하여 유효한 JWT 토큰 가져오기
  beforeAll(async () => {
    const loginResponse = await request(app).post('/api/auth/sign-in').send({
      email: 'play4@example.com', // 테스트용 사용자 이메일
      password: 'StrongPass123!', // 테스트용 사용자 비밀번호
    });

    token = loginResponse.body.data; // 로그인 성공 시 반환된 JWT 토큰
  });

  afterAll(async () => {
    await prisma.$disconnect(); // Prisma 연결 종료
  });

  it('명소 북마크 등록 성공 테스트', async () => {
    const spotId = 3; // 테스트용 명소 ID

    const response = await request(app)
      .post(`/api/spots/${spotId}/bookmark`) // 북마크 등록 API 경로
      .set('Authorization', `Bearer ${token}`); // 유효한 JWT 토큰 설정

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    // 응답 상태 및 반환 데이터 검증
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('명소 북마크 등록 성공');
    expect(response.body.data).toBeDefined();
    expect(response.body.data.spotId).toBe(spotId);
    expect(response.body.data.type).toBe('BOOKMARK');
  });

  /*it('중복된 북마크 등록 시도 시 409 반환', async () => {
    const spotId = 3; // 동일 명소 ID

    const response = await request(app)
      .post(`/api/spots/${spotId}/bookmark`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(409); // 중복 시도 시 상태 코드 확인
    expect(response.body.message).toBe('이미 등록된 북마크입니다.');
  });*/
});
