import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  return res.json('hello world');
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
