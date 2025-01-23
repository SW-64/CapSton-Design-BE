import request from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/utils/prisma.util.js';

describe('명소 등록 테스트', () => {
  let token;

  // 로그인하여 유효한 JWT 토큰 가져오기
  beforeAll(async () => {
    const loginResponse = await request(app).post('/api/auth/sign-in').send({
      email: 'play4@example.com', // 테스트용 사용자 이메일
      password: 'StrongPass123!', // 테스트용 사용자 비밀번호
    });

    token = loginResponse.body.data; // 로그인 성공 시 반환된 JWT 토큰
  });


  it('명소 등록 성공 테스트', async () => {
    const spotName = '테스트'; // 등록할 명소 이름
    const districtId = 2; // 테스트용 구역 ID
    const imageUrl = 'http://example.com/image.jpg'; // 테스트용 이미지 URL

    const response = await request(app)
      .post('/api/spots') // 명소 등록 API 경로
      .set('Authorization', `Bearer ${token}`) // 유효한 JWT 토큰 설정
      .send({ spotName, districtId, imageUrl }); // 명소 데이터 전송

    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);

    // 응답 상태 및 반환 데이터 검증
    expect(response.status).toBe(201); // 성공적으로 생성된 경우 상태 코드 201
    expect(response.body.message).toBe('명소 등록 성공');
    expect(response.body.data).toBeDefined();
    expect(response.body.data.spotName).toBe(spotName);
    expect(response.body.data.cityId).toBe(cityId);
    expect(response.body.data.districtId).toBe(districtId);
    expect(response.body.data.imageUrl).toBe(imageUrl);
    expect(response.body.data).toHaveProperty('spotId'); // 자동 생성된 spotId 확인
  });
/*
  it('중복된 명소 이름으로 등록 시 400 반환', async () => {
    const spotName = '중복 명소'; // 중복된 명소 이름
    const cityId = 1; // 테스트용 도시 ID
    const districtId = 1; // 테스트용 구역 ID
    const imageUrl = 'http://example.com/image.jpg'; // 테스트용 이미지 URL

    // 첫 번째 등록
    await request(app)
      .post('/api/spots')
      .set('Authorization', `Bearer ${token}`)
      .send({ spotName, cityId, districtId, imageUrl });

    // 두 번째 등록 시도
    const response = await request(app)
      .post('/api/spots')
      .set('Authorization', `Bearer ${token}`)
      .send({ spotName, cityId, districtId, imageUrl });

    expect(response.status).toBe(400); // 중복된 명소 이름으로 등록 시 상태 코드 400
    expect(response.body.message).toBe('중복되는 명소 이름이 있습니다.'); // 적절한 오류 메시지 확인
  });

  it('존재하지 않는 도시 ID로 등록 시 404 반환', async () => {
    const spotName = '테스트 명소'; // 등록할 명소 이름
    const invalidCityId = 999; // 존재하지 않는 도시 ID
    const districtId = 1; // 테스트용 구역 ID
    const imageUrl = 'http://example.com/image.jpg'; // 테스트용 이미지 URL

    const response = await request(app)
      .post('/api/spots')
      .set('Authorization', `Bearer ${token}`)
      .send({ spotName, cityId: invalidCityId, districtId, imageUrl });

    expect(response.status).toBe(404); // 존재하지 않는 도시 ID로 등록 시 상태 코드 404
    expect(response.body.message).toBe('해당 대도시가 없음'); // 적절한 오류 메시지 확인
  });

  it('존재하지 않는 구역 ID로 등록 시 404 반환', async () => {
    const spotName = '테스트 명소'; // 등록할 명소 이름
    const cityId = 1; // 테스트용 도시 ID
    const invalidDistrictId = 999; // 존재하지 않는 구역 ID
    const imageUrl = 'http://example.com/image.jpg'; // 테스트용 이미지 URL

    const response = await request(app)
      .post('/api/spots')
      .set('Authorization', `Bearer ${token}`)
      .send({ spotName, cityId, districtId: invalidDistrictId, imageUrl });

    expect(response.status).toBe(404); // 존재하지 않는 구역 ID로 등록 시 상태 코드 404
    expect(response.body.message).toBe('해당 도시에 맞는 행정구역이 없음'); // 적절한 오류 메시지 확인
  });

  it('명소 등록 시 필수 필드 누락 시 400 반환', async () => {
    const response = await request(app)
      .post('/api/spots')
      .set('Authorization', `Bearer ${token}`)
      .send({}); // 필수 필드 누락

    expect(response.status).toBe(400); // 필수 필드 누락 시 상태 코드 확인
    expect(response.body.message).toBe('필수 필드가 누락되었습니다.'); // 적절한 오류 메시지 확인
  });*/
});
