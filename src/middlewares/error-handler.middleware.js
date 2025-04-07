import { HTTP_STATUS } from '../constants/http-status.constant.js';

export const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof Error && err.statusCode) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  if (err instanceof Error && err.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({
    status: 500,
    message: '예상치 못한 에러가 발생하였습니다.',
  });
};
