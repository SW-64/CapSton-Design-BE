import express from 'express';
import { apiRouter } from './routers/index.js';
import { globalErrorHandler } from './middlewares/error-handler.middleware.js';
import { SERVER_PORT } from './constants/env.constant.js';
import { createClient } from 'redis';

// const redis = await createClient({
//   url: 'http://database-cache-server.mxkffs.ng.0001.apn2.cache.amazonaws.com:6379',
//   legacyMode: true,
// }).on('error', (err) => console.log('Redis Client Error', err));
// const redis = await createClient({
//   socket: {
//     port: 6379,
//     host: 'database-cache-server.mxkffs.ng.0001.apn2.cache.amazonaws.com',
//     connectTimeout: 30000, // 타임아웃을 30초로 설정
//     legacyMode: true,
//   },
// }).on('error', (err) => console.log('Redis Client Error', err));

// await redis.connect();

const app = express();
const port = SERVER_PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);
app.use(globalErrorHandler);

app.get('/', (req, res) => {
  return res.json('hello world');
});
app.listen(port, async () => {
  console.log(`Server is listening on ${port}`);
});
