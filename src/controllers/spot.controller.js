import { HTTP_STATUS } from '../constants/http-status.constant.js';

class SpotController {
  constructor(spotService) {
    this.spotService = spotService;
  }

  setSpot = async (req, res, next) => {
    try {
      const { spotName, region } = req.body;
      const setSpot = await this.spotService.setSpot(spotName, region);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 등록 성공',
        data: setSpot,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SpotController;
