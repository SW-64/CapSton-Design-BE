import request from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/utils/prisma.util.js';

describe('명소 북마크 삭제 테스트', () => {
  let token;

  // 로그인하여 유효한 JWT 토큰 가져오기
  beforeAll(async () => {
    const loginResponse = await request(app).post('/api/auth/sign-in').send({
      email: 'play4@example.com', // 테스트용 사용자 이메일
      password: 'StrongPass123!', // 테스트용 사용자 비밀번호
    });

    token = loginResponse.body.data; // 로그인 성공 시 반환된 JWT 토큰
  });
/*
  beforeEach(async () => {
    // 테스트 데이터 삽입 (북마크 등록)
    await prisma.interaction.create({
      data: {
        spotId: 1, // 테스트 명소 ID
        userId: 1, // 테스트 사용자 ID
        type: 'BOOKMARK',
      },
    });
  });

  afterEach(async () => {
    // 테스트 데이터 정리
    await prisma.interaction.deleteMany({
      where: {
        spotId: 1,
        userId: 1,
        type: 'BOOKMARK',
      },
    });
  });
*/
  afterAll(async () => {
    await prisma.$disconnect(); // Prisma 연결 종료
  });

  it('명소 북마크 삭제 성공 테스트', async () => {
    const spotId = 1; // 테스트용 명소 ID

    const response = await request(app)
      .delete(`/api/spots/${spotId}/bookmark`) // 북마크 삭제 API 경로
      .set('Authorization', `Bearer ${token}`); // 유효한 JWT 토큰 설정

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    // 응답 상태 및 메시지 검증
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('명소 북마크 삭제 성공');
  });

  /*it('존재하지 않는 북마크 삭제 시 404 반환', async () => {
    const spotId = 99999; // 존재하지 않는 명소 ID

    const response = await request(app)
      .delete(`/api/spots/${spotId}/bookmark`) // 북마크 삭제 API 경로
      .set('Authorization', `Bearer ${token}`); // 유효한 JWT 토큰 설정

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    // 응답 상태 및 메시지 검증
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('해당되는 북마크가 없습니다.');
  });*/
});
