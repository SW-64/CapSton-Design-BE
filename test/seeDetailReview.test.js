import request from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/utils/prisma.util.js';

describe('명소 리뷰 상세 조회 테스트', () => {
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
/*
  beforeEach(async () => {
    // 테스트 전 데이터베이스에 미리 데이터를 설정합니다.
    await prisma.review.create({
      data: {
        spotId: 1, // 테스트용 명소 ID
        userId: 1, // 테스트용 사용자 ID
        rate: 5,
        content: '정말 멋진 곳이었습니다!',
      },
    });
  });


  afterEach(async () => {
    // 각 테스트 후 리뷰 데이터를 삭제합니다.
    await prisma.review.deleteMany(); // 모든 리뷰 삭제
  });
*/

  it('명소 리뷰 상세 조회 성공 테스트', async () => {
    const spotId = 1; // 테스트용 명소 ID
    const reviewId = 8; // 테스트용 리뷰 ID
    const userId = 1; // 테스트용 사용자 ID

    const response = await request(app)
      .get(`/api/spots/${spotId}/reviews/${reviewId}`) // 리뷰 상세 조회 API 경로
      .set('Authorization', `Bearer ${token}`); // 유효한 JWT 토큰 설정

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    // 응답 상태 및 반환 데이터 검증
    expect(response.status).toBe(200); // 성공적으로 조회된 경우 상태 코드 200
    expect(response.body).toBeDefined();
    expect(response.body.data).toHaveProperty('spotId', spotId); // spotId가 일치하는지 확인
    expect(response.body.data).toHaveProperty(
      'content',
      '정말 멋진 곳이었습니다!',
    ); // 리뷰 내용 확인
  });
/*
  it('존재하지 않는 리뷰 ID로 요청 시 null 반환', async () => {
    const spotId = 1; // 테스트용 명소 ID
    const invalidReviewId = 999; // 존재하지 않는 리뷰 ID

    const response = await request(app)
      .get(`/api/spots/${spotId}/reviews/${invalidReviewId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404); // 존재하지 않는 리뷰 요청 시 상태 코드 404
    expect(response.body.message).toBe('리뷰를 찾을 수 없습니다.'); // 적절한 오류 메시지 확인
  });

  it('존재하지 않는 명소 ID로 요청 시 null 반환', async () => {
    const invalidSpotId = 999; // 존재하지 않는 명소 ID
    const reviewId = 1; // 테스트용 리뷰 ID

    const response = await request(app)
      .get(`/api/spots/${invalidSpotId}/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404); // 존재하지 않는 명소 요청 시 상태 코드 404
    expect(response.body.message).toBe('명소를 찾을 수 없습니다.'); // 적절한 오류 메시지 확인
  });
  */
});

/* 이 테스트 코드에서 궁금한점
   이 테스트코드를 만드는 과정에서 이후에 모든 리뷰를 삭제시키는 코드를 넣어서 테스트 코드를 진행했었고
   테스트를 하면서 리뷰를 추가하는 부분에서 리뷰가 모두 삭제되면 reviewid가 1에서 시작할 줄 알았는데
   reviewid가 계속 1씩 추가되어 위쪽에서 리뷰아이디를 1씩 증가하여 테스트 코드를 진행하였다
   -> reviewid를 모두 삭제하고 추가하면 reviewid가 1부터 시작이 아니라 그전 숫자에 이어서 생성된다
   삭제전 reviewid가 7이면 모두삭제하고 추가했을 때 8부터 시작된다?? bookmark와 좋아요 또한 같음 
*/
