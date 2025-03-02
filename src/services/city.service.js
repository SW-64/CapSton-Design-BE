import { NotFoundError } from '../errors/http.error.js';
import CityRepository from '../repositories/city.repository.js';

class CityService {
  cityRepository = new CityRepository();
  // 명소 등록
  setSpot = async (spotName, cityId, districtId, imageUrl) => {
    // 중복되는 명소 이름이 있을때 에러반환
    const existedSpot = await this.cityRepository.findSpotName(spotName);
    if (existedSpot)
      throw new BadRequestError('중복되는 명소 이름이 있습니다.');

    // 해당 대도시가 없을 때 에러 반환
    const existedCity = await this.cityRepository.findCity(cityId);
    if (!existedCity) throw new NotFoundError('해당 대도시가 없음');
    // 해당 대도시의 행정구역이 없다면 에러 반환
    const existedDistrct = await this.cityRepository.findDistrict(
      cityId,
      districtId,
    );
    if (!existedDistrct)
      throw new NotFoundError('해당 도시에 맞는 행정구역이 없음');

    const setSpot = await this.cityRepository.setSpot(
      spotName,
      districtId,
      imageUrl,
    );
    return {
      spotId: setSpot.spotId,
      spotName: setSpot.spotName,
      districtId: setSpot.districtId,
      like: setSpot.like,
      imageUrl: setSpot.imageUrl,
    };
  };

  // 해당 도시 전체 명소 조회
  getAllDistrictSpot = async (cityId, page) => {
    // 해당 대도시가 없을 때 에러 반환
    const existedCity = await this.cityRepository.findCity(cityId);
    if (!existedCity) throw new NotFoundError('해당 대도시가 없음');

    const getAllDistrictSpot = await this.cityRepository.getAllDistrictSpot(
      cityId,
      page,
    );
    const AllSpot = getAllDistrictSpot.map((spot) => ({
      spotId: spot.spotId,
      spotName: spot.spotName,
      districtId: spot.districtId,
      like: spot.like,
      imageUrl: spot.imageUrl,
      cityId: spot.district.cityId,
    }));
    return AllSpot;
  };

  //해당 행정구역 전체 명소 조회
  getOneDistrictSpot = async (cityId, districtId, page) => {
    // 해당 행정구역이 없을 때 에러 반환
    const existedDistrict = await this.cityRepository.findDistrict(
      cityId,
      districtId,
    );
    if (!existedDistrict) throw new NotFoundError('해당 행정구역이 없음');

    const getOneDistrictSpot = await this.cityRepository.getOneDistrictSpot(
      districtId,
      page,
    );
    const AllSpot = getOneDistrictSpot.map((spot) => ({
      spotId: spot.spotId,
      spotName: spot.spotName,
      districtId: spot.districtId,
      like: spot.like,
      imageUrl: spot.imageUrl,
      cityId: cityId,
    }));
    return AllSpot;
  };

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
