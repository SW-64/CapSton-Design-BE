import express from 'express';
import { apiRouter } from './routers/index.js';
import { globalErrorHandler } from './middlewares/error-handler.middleware.js';
import {
  ELASTICACHE_HOST,
  ELASTICACHE_PASSWORD,
  ELASTICACHE_PORT,
  ELASTICACHE_USER,
  SERVER_PORT,
} from './constants/env.constant.js';
import { createClient } from 'redis';

const elasticacheHost = ELASTICACHE_HOST;
const elasticachePort = ELASTICACHE_PORT;
const elasticacheUser = ELASTICACHE_USER;
const elasticachePassword = ELASTICACHE_PASSWORD;
const client = await createClient({
  url: `redis://:${elasticachePassword}@${elasticacheHost}:${elasticachePort}`,
});
console.log('before connect redis');
await client.connect();
console.log('after connect redis');
console.log(await client.ping());

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
