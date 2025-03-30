import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import CityService from '../services/city.service.js';

class CityController {
  cityService = new CityService();

  // 저작권 무료 API 전체 명소 조회
  getFreeImages = async (req, res, next) => {
    try {
      const { cityId } = req.params;
      // 쿼리값으로 API 출처 확인
      const source = req.query.source;
      const search = req.query.search;

      const getFreeImages = await this.cityService.getFreeImages(
        source,
        +cityId,
        search,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.CITY.GET_FREE_IMAGES_API.SUCCEED,
        data: getFreeImages,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CityController;
