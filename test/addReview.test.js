import request from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/utils/prisma.util.js';

describe('명소 리뷰 등록 테스트', () => {
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

  it('명소 리뷰 등록 성공 테스트', async () => {
    const spotId = 1; // 테스트용 명소 ID
    const rate = 5; // 리뷰 평점
    const content = '정말 멋진 곳이었습니다!'; // 리뷰 내용

    const response = await request(app)
      .post(`/api/spots/${spotId}/reviews`) // 리뷰 등록 API 경로
      .set('Authorization', `Bearer ${token}`) // 유효한 JWT 토큰 설정
      .send({ rate, content }); // 리뷰 데이터 전송

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    // 응답 상태 및 반환 데이터 검증
    expect(response.status).toBe(201); // 성공적으로 생성된 경우 상태 코드 201
    expect(response.body.message).toBe('리뷰 등록 성공');
    expect(response.body.data).toBeDefined();
    expect(response.body.data.spotId).toBe(spotId);
    expect(response.body.data.rate).toBe(rate);
    expect(response.body.data.content).toBe(content);
  }); 
    // -> 그런데 현재 200을 받아오는중 그래서 오류로 뜨는데 데이터베이스에는 성공적으로 저장됨
    // 생성에 성공했는데 왜 200을 불러오는지 알 수 없다

  /*it('명소 리뷰 등록 시 필수 필드 누락 시 400 반환', async () => {
    const spotId = 1; // 테스트용 명소 ID

    const response = await request(app)
      .post(`/api/spots/${spotId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send({}); // 필수 필드 누락

    expect(response.status).toBe(400); // 필수 필드 누락 시 상태 코드 확인
    expect(response.body.message).toBe('필수 필드가 누락되었습니다.');
  });*/
});
