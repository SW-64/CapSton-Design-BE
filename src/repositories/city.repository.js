import { prisma } from '../utils/prisma.util.js';

class CityRepository {
  // 명소 등록
  setSpot = async (spotName, districtId, imageUrl) => {
    console.log(imageUrl);
    return await prisma.spot.create({
      data: {
        spotName: spotName,
        districtId: districtId,
        imageUrl: imageUrl,
      },
    });
  };

  // 해당 도시 전체 명소 조회
  getAllDistrictSpot = async (cityId) => {
    return await prisma.spot.findMany({
      where: {
        district: {
          city: {
            cityId,
          },
        },
      },
      include: {
        district: true,
      },
    });
  };
  //해당 행정구역 전체 명소 조회
  getOneDistrictSpot = async (districtId) => {
    return await prisma.spot.findMany({
      where: {
        districtId,
      },
    });
  };

  // 대도시 조회
  findCity = async (cityId) => {
    return await prisma.city.findFirst({
      where: {
        cityId,
      },
    });
  };

  //행정구역 조회
  findDistrict = async (cityId, districtId) => {
    return await prisma.district.findFirst({
      where: {
        cityId,
        districtId,
      },
    });
  };

  // 명소 이름으로 명소 찾기
  findSpotName = async (spotName) => {
    return await prisma.spot.findFirst({
      where: {
        spotName: spotName,
      },
    });
  };
}

export default CityRepository;
