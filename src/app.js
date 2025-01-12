import express from 'express';
import { apiRouter } from './routers/index.js';
import { globalErrorHandler } from './middlewares/error-handler.middleware.js';
import {
  ELASTICACHE_HOST,
  ELASTICACHE_PORT,
  SERVER_PORT,
} from './constants/env.constant.js';
import { createClient } from 'redis';

const elasticacheHost = ELASTICACHE_HOST;
const elasticachePort = ELASTICACHE_PORT;

export const client = await createClient({
  url: `redis://${elasticacheHost}:${elasticachePort}`,
  legacyMode: false,
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
