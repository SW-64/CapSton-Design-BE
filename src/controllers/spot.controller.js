import { HTTP_STATUS } from '../constants/http-status.constant.js';

class SpotController {
  constructor(spotService) {
    this.spotService = spotService;
  }
  // 명소 등록
  setSpot = async (req, res, next) => {
    try {
      const imageUrl = req.files[0].location;
      const { spotName, region } = req.body;
      console.log(imageUrl);
      const setSpot = await this.spotService.setSpot(
        spotName,
        region,
        imageUrl,
      );
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '명소 등록 성공',
        data: setSpot,
      });
    } catch (error) {
      next(error);
    }
  };

  //전체 명소 조회
  getAllSpot = async (req, res, next) => {
    try {
      const { region } = req.body;
      const getAllSpot = await this.spotService.getAllSpot(region);
      console.log(getAllSpot);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '전체 명소 조회 성공',
        data: getAllSpot,
      });
    } catch (error) {
      next(error);
    }
  };

  //상세 명소 조회
  getOneSpot = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const getOneSpot = await this.spotService.getOneSpot(+spotId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '상세 명소 조회 성공',
        data: getOneSpot,
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 삭제
  deleteSpot = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const deleteSpot = await this.spotService.deleteSpot(+spotId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 삭제 성공',
        data: deleteSpot,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SpotController;
