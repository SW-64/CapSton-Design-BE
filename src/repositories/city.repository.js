import { json } from 'express';
import { PUBLIC_DATA_PORTAL } from '../constants/env.constant.js';
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
  getAllDistrictSpot = async (cityId, page) => {
    return await prisma.spot.findMany({
      skip: (page - 1) * 10,
      take: 10,
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
  getOneDistrictSpot = async (districtId, page) => {
    return await prisma.spot.findMany({
      skip: (page - 1) * 10,
      take: 10,
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

  // 저작권 무료 API 전체 명소 조회
  getFreeImages = async (source, cityId) => {
    console.log(source, cityId);
    if (source == 'publicDataPortal' && cityId == 2) {
      try {
        // API 요청 보내기
        const response = await fetch(
          `https://api.incheoneasy.com/api/tour/touristPhotoInfo?accessToken=${PUBLIC_DATA_PORTAL}&pageNo=2`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json', // JSON 응답을 원한다고 서버에 알림
            },
          },
        );

        // 응답이 정상적이지 않을 경우 에러 처리
        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const textData = await response.json();
        const again = JSON.parse(textData.data);
        console.log(again.dataList);
        return textData.data;
      } catch (error) {
        console.error('에러 발생:', error.message);
        return { error: 'API 요청 중 오류가 발생했습니다.' };
      }
    }
  };
}

export default CityRepository;
