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
  setInteraction = async (spotId, userId, type) => {
    return await prisma.interaction.create({
      data: {
        spotId,
        userId,
        type,
      },
    });
  };

  // 명소 북마크 조회
  getBookmark = async (userId) => {
    return await prisma.interaction.findMany({
      where: {
        userId,
        type: 'BOOKMARK',
      },
    });
  };

  // 명소 북마크 삭제
  deleteInteraction = async (spotId, userId, type) => {
    return await prisma.interaction.delete({
      where: {
        spotId: spotId,
        userId: userId,
        type,
      },
    });
  };

  // 북마크&좋아요 여부 확인
  checkInteraction = async (spotId, userId, type) => {
    return await prisma.interaction.findFirst({
      where: {
        spotId,
        userId,
        type,
      },
    });
  };

  // 명소 리뷰 등록
  setReview = async (spotId, userId, rate, content) => {
    return await prisma.review.create({
      data: {
        spotId,
        userId,
        rate,
        content,
      },
    });
  };

  // 명소 리뷰 전체 조회
  getAllReview = async (spotId) => {
    return await prisma.review.findMany({
      where: {
        spotId,
      },
    });
  };

  // 명소 리뷰 상세 조회
  getOneReview = async (spotId, reviewId, userId) => {
    return await prisma.review.findFirst({
      where: {
        spotId,
        reviewId,
      },
      // include: {
      //   user: {
      //     select: {
      //       nickName: true,
      //     },
      //   },
      // },
    });
  };
}

export default SpotRepository;
