import { prisma } from '../utils/prisma.util.js';

class SpotRepository {
  // 상세 명소 조회
  getOneSpot = async (spotId) => {
    // 캐시에 있을 시
    // const cachespotId = await client.hGetAll(`spotId:${spotId}`);
    // if (Object.keys(cachespotId).length) return cachespotId;
    // 캐시에 없을 시

    const getOneSpot = await prisma.spot.findUnique({
      where: {
        spotId: spotId,
      },
      include: {
        SpotCategory: {
          select: {
            category: {
              select: {
                categoryId: true,
                name: true,
              },
            },
          },
        },
      },
    });
    // await client.hSet(`spotId:${spotId}`, {
    //   spotId: getOneSpot.spotId,
    //   spotName: getOneSpot.spotName,
    //   like: getOneSpot.like,
    //   imageUrl: getOneSpot.imageUrl,
    //   districtId: getOneSpot.district.districtId,
    //   cityId: getOneSpot.district.cityId,
    // });
    // await client.expire(`spotId:${spotId}`, 600);
    return getOneSpot;
  };

  // 명소 삭제
  deleteSpot = async (spotId) => {
    const deleteCategory = await prisma.spotCategory.delete({});
    const deleteSpot = await prisma.spot.delete({
      where: {
        spotId: spotId,
      },
    });
  };

  // 명소 북마크 등록
  setInteraction = async (spotId, userId) => {
    console.log(spotId, userId);
    return await prisma.interaction.create({
      data: {
        spotId,
        userId,
        type: 'BOOKMARK',
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
  deleteInteraction = async (interactionId) => {
    return await prisma.interaction.delete({
      where: {
        interactionId,
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

  // 명소 이름으로 명소 찾기
  findSpotName = async (spotName) => {
    return await prisma.spot.findFirst({
      where: {
        spotName: spotName,
      },
    });
  };

  // 명소 등록
  setSpot = async (spotName, imageUrl, extraInfo, userId, categories) => {
    console.log(imageUrl);
    const spot = await prisma.spot.create({
      data: {
        spotName,
        imageUrl,
        extraInfo,
        userId,
      },
    });
    categories.map(async (category) => {
      const spotCategory = await prisma.spotCategory.create({
        data: {
          spotId: spot.spotId,
          categoryId: Number(category),
        },
      });
    });
  };

  // 명소 사진 공개/비공개 전환
  changeVisibility = async (userId, spotId, newVisibility) => {
    return await prisma.spot.update({
      where: {
        userId,
        spotId,
      },
      data: {
        isPublic: newVisibility,
      },
    });
  };

  // 사용자가 올린 명소 조회
  getAllSpot = async (categories) => {
    console.log(categories);
    return await prisma.spot.findMany({
      where: {
        isPublic: 'PUBLIC',
        ...(Array.isArray(categories) &&
          categories.length > 0 && {
            AND: categories.map((id) => ({
              SpotCategory: {
                some: {
                  category: {
                    categoryId: Number(id),
                  },
                },
              },
            })),
          }),
      },
      select: {
        spotId: true,
        spotName: true,
        imageUrl: true,
        extraInfo: true,
        userId: true,
        user: {
          select: {
            nickName: true,
            profile: true,
          },
        },
        SpotCategory: {
          select: {
            category: {
              select: {
                categoryId: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  };
}

export default SpotRepository;
