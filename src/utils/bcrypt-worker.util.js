import { workerData, parentPort, isMainThread } from 'worker_threads';
import bcrypt from 'bcrypt';

export default async ({ password, hash, saltRounds }) => {
  if (hash) {
    // compare 모드
    return await bcrypt.compare(password, hash);
  } else {
    // hash 모드
    return await bcrypt.hash(password, saltRounds || 10);
  }
};
