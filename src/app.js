import 'dotenv/config';
import express from 'express';
import { apiRouter } from './routers/index.js';
import { globalErrorHandler } from './middlewares/error-handler.middleware.js';

const app = express();
const port = process.env.SERVER_PORT;
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
