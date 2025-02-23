import { HTTP_STATUS } from '../constants/http-status.constant.js';
import CityService from '../services/city.service.js';

class CityController {
  cityService = new CityService();
  // 명소 등록
  setSpot = async (req, res, next) => {
    try {
      const imageUrl = req.files[0].location;
      const { cityId, districtId } = req.params;
      const { spotName } = req.body;

      const setSpot = await this.cityService.setSpot(
        spotName,
        +cityId,
        +districtId,
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

  //해당 도시 전체 명소 조회
  getAllDistrictSpot = async (req, res, next) => {
    try {
      const { cityId } = req.params;

      // 쿼리값으로 page  받기
      const page = Math.max(1, parseInt(req.query.page) || 1);

      const getAllDistrictSpot = await this.cityService.getAllDistrictSpot(
        +cityId,
        page,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '해당 도시 전체 명소 조회 성공',
        data: getAllDistrictSpot,
      });
    } catch (error) {
      next(error);
    }
  };

  //해당 행정구역 전체 명소 조회
  getOneDistrictSpot = async (req, res, next) => {
    try {
      const { cityId, districtId } = req.params;

      // 쿼리값으로 page  받기
      const page = Math.max(1, parseInt(req.query.page) || 1);

      const getOneDistrictSpot = await this.cityService.getOneDistrictSpot(
        +cityId,
        +districtId,
        page,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '전체 명소 조회 성공',
        data: getOneDistrictSpot,
      });
    } catch (error) {
      next(error);
    }
  };

  // 저작권 무료 API 전체 명소 조회
  getFreeImages = async (req, res, next) => {
    try {
      const { cityId } = req.params;
      // 쿼리값으로 API 출처 확인
      const source = req.query.source;

      const getFreeImages = await this.cityService.getFreeImages(
        source,
        +cityId,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '저작권 무료 API 전체 명소 조회',
        data: getFreeImages,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CityController;
