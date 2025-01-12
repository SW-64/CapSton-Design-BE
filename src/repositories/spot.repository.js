import { client } from '../app.js';
import { prisma } from '../utils/prisma.util.js';

class SpotRepository {
  // 상세 명소 조회
  getOneSpot = async (spotId) => {
    // 캐시에 있을 시
    const cachespotId = await client.hGetAll(`spotId:${spotId}`);
    if (Object.keys(cachespotId).length) return cachespotId;
    // 캐시에 없을 시

    const getOneSpot = await prisma.spot.findUnique({
      where: {
        spotId: spotId,
      },
      include: {
        district: {
          select: {
            districtId: true,
            cityId: true,
          },
        },
      },
    });
    console.log(getOneSpot);
    await client.hSet(`spotId:${spotId}`, {
      spotId: getOneSpot.spotId,
      spotName: getOneSpot.spotName,
      like: getOneSpot.like,
      imageUrl: getOneSpot.imageUrl,
      districtId: getOneSpot.district.districtId,
      cityId: getOneSpot.district.cityId,
    });
    await client.expire(`spotId:${spotId}`, 600);
    return getOneSpot;
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
