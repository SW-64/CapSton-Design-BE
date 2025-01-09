import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: 'database-cache-server.mxkffs.ng.0001.apn2.cache.amazonaws.com', // Redis 엔드포인트
    port: 6379, // Redis 기본 포트
    connectTimeout: 30000, // 타임아웃 설정 (30초)
  },
  legacyMode: true, // Redis 4.x 이상에서 필요
});

// 에러 핸들러
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// 연결 및 PING 테스트
const runRedis = async () => {
  try {
    await redisClient.connect(); // Redis 연결
    console.log('Redis connected successfully!');

    // PING 테스트
    const pong = await redisClient.ping();
    console.log('PING response:', pong); // 출력: PONG
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  } finally {
    await redisClient.disconnect(); // 연결 종료
    console.log('Redis connection closed.');
  }
};

// 실행
runRedis();
