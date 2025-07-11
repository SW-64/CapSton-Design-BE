import axios from 'axios';
import FormData from 'form-data';

const LOGIN_URL = 'http://localhost:3000/api/auth/sign-in';
const SPOT_URL = 'http://localhost:3000/api/spots';

async function login(email, password) {
  const { data } = await axios.post(LOGIN_URL, { email, password });

  return data.data;
}

async function getRandomImageStream() {
  const response = await axios({
    method: 'get',
    url: 'https://picsum.photos/600/400', // 랜덤 이미지
    responseType: 'stream',
  });
  return response.data; // 이미지 스트림
}

async function registerSpot(token, spotName, extraInfo) {
  const form = new FormData();
  const imageStream = await getRandomImageStream();

  form.append('spotName', spotName);
  form.append('extraInfo', extraInfo);
  form.append('image', imageStream, 'random.jpg');

  await axios.post(SPOT_URL, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...form.getHeaders(),
    },
  });
}

async function main() {
  for (let userId = 399; userId < 573; userId++) {
    // 🔥 테스트용: 74~78 유저
    const email = `user${userId - 51}@example.com`;
    const password = '1234';
    const token = await login(email, password);

    for (let i = 1; i <= 2; i++) {
      const spotName = `Spot ${userId}_${i}`;
      const extraInfo = '인천광역시 중구';
      console.log(`등록: ${email} -> ${spotName}`);
      await registerSpot(token, spotName, extraInfo);
    }
  }
}

main().catch(console.error);
