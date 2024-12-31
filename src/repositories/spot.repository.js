import { prisma } from '../utils/prisma.util.js';

class SpotRepository {
  // 명소 등록
  setSpot = async (spotName, region, imageUrl) => {
    console.log(imageUrl);
    return await prisma.spot.create({
      data: {
        spotName: spotName,
        region: region,
        imageUrl: imageUrl,
      },
    });
  };

  // 전체 명소 조회
  getAllSpot = async (region) => {
    return await prisma.spot.findMany({
      where: {
        region: region,
      },
    });
  };

  // 상세 명소 조회
  getOneSpot = async (spotId) => {
    return await prisma.spot.findUnique({
      where: {
        spotId: spotId,
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

  // 명소 삭제
  deleteSpot = async (spotId) => {
    return await prisma.spot.delete({
      where: {
        spotId: spotId,
      },
    });
  };

  // 명소 북마크 등록
  setBookmark = async (spotId) => {
    return await prisma.interaction.create({
      where: {
        spotName: spotName,
      },
    });
  };
}

export default SpotRepository;
