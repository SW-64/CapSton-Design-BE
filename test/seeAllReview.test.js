import request from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/utils/prisma.util.js';

describe('명소 리뷰 전체 조회 테스트', () => {
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

  it('명소 리뷰 전체 조회 성공 테스트', async () => {
    const spotId = 1; // 테스트용 명소 ID

    const response = await request(app)
      .get(`/api/spots/${spotId}/reviews`) // 리뷰 전체 조회 API 경로
      .set('Authorization', `Bearer ${token}`); // 유효한 JWT 토큰 설정

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    // 응답 상태 및 반환 데이터 검증
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('명소 전체 리뷰 조회 성공');
    expect(Array.isArray(response.body.data)).toBe(true); // 데이터가 배열인지 확인
    expect(response.body.data.length).toBeGreaterThanOrEqual(0); // 리뷰 수가 0 이상인지 확인
  });

  /*it('존재하지 않는 명소 ID로 요청 시 404 반환', async () => {
    const invalidSpotId = 999; // 존재하지 않는 명소 ID

    const response = await request(app)
      .get(`/api/spots/${invalidSpotId}/reviews`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404); // 존재하지 않는 ID 요청 시 상태 코드 확인
    expect(response.body.message).toBe('명소를 찾을 수 없습니다.');
  });*/
});
