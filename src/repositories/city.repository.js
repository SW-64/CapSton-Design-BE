import { XMLParser } from 'fast-xml-parser';
import {
  KOREA_TOUR_DATA,
  PUBLIC_DATA_PORTAL,
  SEOUL_OPEN_DATA,
} from '../constants/env.constant.js';
import { prisma } from '../utils/prisma.util.js';
import { MESSAGES } from '../constants/message.constant.js';
import { InternalServerError } from '../errors/http.error.js';

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
  getFreeImages = async (source, cityId, search) => {
    console.log(source, cityId);
    // 인천 공공 데이터
    if (source == 'publicDataPortal' && cityId == 2) {
      try {
        // API 요청 보내기
        const response = await fetch(
          `https://api.incheoneasy.com/api/tour/touristPhotoInfo?accessToken=${PUBLIC_DATA_PORTAL}&pageNo=1&n=100`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json', // JSON 응답을 원한다고 서버에 알림
            },
          },
        );

        // 응답이 정상적이지 않을 경우 에러 처리
        if (!response.ok) {
          throw new InternalServerError(
            MESSAGES.CITY.GET_FREE_IMAGES_API.REQUEST_API_ERROR,
          );
        }

        const textData = await response.json();
        const parsedData = JSON.parse(textData.data);
        console.log(parsedData.dataList);
        return textData.data;
      } catch (error) {
        return { error: MESSAGES.CITY.GET_FREE_IMAGES_API.REQUEST_API_ERROR };
      }
      // 서울 공원 데이터
    } else if (source == 'seoulPark') {
      try {
        // API 요청 보내기
        const response = await fetch(
          `http://openapi.seoul.go.kr:8088/${SEOUL_OPEN_DATA}/json/SearchParkInfoService/1/129/`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
        );

        // 응답이 정상적이지 않을 경우 에러 처리
        if (!response.ok) {
          throw new InternalServerError(
            MESSAGES.CITY.GET_FREE_IMAGES_API.REQUEST_API_ERROR,
          );
        }

        const textData = await response.json();

        return textData.SearchParkInfoService.row;
      } catch (error) {
        return { error: MESSAGES.CITY.GET_FREE_IMAGES_API.REQUEST_API_ERROR };
      }
    }
    // 한국 관광 공사
    else if (source == 'koreaTourData') {
      try {
        // API 요청 보내기
        const response = await fetch(
          `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=${KOREA_TOUR_DATA}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&keyword=${search}`,
          {
            method: 'GET',
          },
        );

        // 응답이 정상적이지 않을 경우 에러 처리
        if (!response.ok) {
          throw new InternalServerError(
            MESSAGES.CITY.GET_FREE_IMAGES_API.REQUEST_API_ERROR,
          );
        }

        const textData = await response.json();

        return textData.response.body.items.item;
      } catch (error) {
        return { error: MESSAGES.CITY.GET_FREE_IMAGES_API.REQUEST_API_ERROR };
      }
    }
  };
}

export default CityRepository;
