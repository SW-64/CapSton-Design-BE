import express from 'express';
import { apiRouter } from './routers/index.js';
import { globalErrorHandler } from './middlewares/error-handler.middleware.js';
import {
  ELASTICACHE_HOST,
  ELASTICACHE_PORT,
  PUBLIC_DATA_PORTAL,
  SERVER_PORT,
} from './constants/env.constant.js';
import { createClient } from 'redis';
import cors from 'cors';

// const elasticacheHost = ELASTICACHE_HOST;
// const elasticachePort = ELASTICACHE_PORT;

// export const client = await createClient({
//   url: `redis://${elasticacheHost}:${elasticachePort}`,
//   legacyMode: false,
// });
// console.log('before connect redis');
// await client.connect();
// console.log('after connect redis');
// console.log(await client.ping());

export const app = express();
const port = SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRouter);
app.use(globalErrorHandler);
app.get('/', (req, res) => {
  return res.json('hello world test');
});
// API 데이터 가져오기
app.get('/api/tourist-photos', async (req, res) => {
  try {
    const pages = Array.from({ length: 20 }, (_, i) => i + 1);
    const accessToken = process.env.PUBLIC_DATA_PORTAL; // .env 파일에 API 키 설정
    console.log('zzzz');
    const responses = await Promise.all(
      pages.map((page) =>
        axios.get(
          `https://api.incheoneasy.com/api/tour/touristPhotoInfo?accessToken=${accessToken}&pageNo=${page}&trrsrtAddr=연수구`,
        ),
      ),
    );
    console.log(responses);
    // 데이터 가공
    const allData = responses
      .map((response) => JSON.parse(response.data.data).dataList)
      .flat();

    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '데이터를 불러오는 데 실패했습니다.' });
  }
});
app.listen(port, async () => {
  console.log(`Server is listening on ${port}`);
});

export default app; // app을 default export로 변경
/* 
export {server} ;
*/
