import { MESSAGES } from '../constants/message.constant.js';
import { NotFoundError } from '../errors/http.error.js';
import CityRepository from '../repositories/city.repository.js';

class CityService {
  cityRepository = new CityRepository();

  // 저작권 무료 API 전체 명소 조회
  getFreeImages = async (source, cityId, search) => {
    // 만약 source가 불러오는 API 목록에 없을 시 기본API ( 공공데이터 포털 ) 반환
    const apiList = [
      'Pexels',
      'Pixabay',
      'culturePublicData',
      'publicDataPortal',
    ];

    if (!(source in apiList)) {
      const source = 'publicDataPortal';
    }

    const getFreeImages = await this.cityRepository.getFreeImages(
      source,
      cityId,
      search,
    );

    return getFreeImages;
  };
}

export default CityService;
