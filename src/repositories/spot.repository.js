import { NotFoundError } from '../errors/http.error.js';
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
    const existedCategory = await prisma.spotCategory.findMany({
      where: {
        spot: {
          spotId,
        },
      },
    });
    if (existedCategory) {
      existedCategory.map(async (spotCategory) => {
        await prisma.spotCategory.delete({
          where: {
            spotCategoryId: spotCategory.spotCategoryId,
          },
        });
      });
    }
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
      select: {
        spotId: true,
        userId: true,
        type: true,
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
    console.log(categories);
    if (categories) {
      categories.map(async (category) => {
        const spotCategory = await prisma.spotCategory.create({
          data: {
            spotId: spot.spotId,
            categoryId: Number(category),
          },
        });
      });
    }
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
  getAllSpot = async (categories, page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;

    // 1️⃣ SpotCategory에서 카테고리 일치하는 SpotId 가져오기
    const spotIds = await prisma.spotCategory.findMany({
      where: {
        category: {
          categoryId: { in: categories.map(Number) },
        },
      },
      select: { spotId: true },
    });

    // 2️⃣ SpotId별 카테고리 개수 세기
    const spotIdCounts = spotIds.reduce((acc, { spotId }) => {
      acc[spotId] = (acc[spotId] || 0) + 1;
      return acc;
    }, {});

    // 3️⃣ 모든 카테고리가 속한 SpotId만 추출
    const matchedSpotIds = Object.entries(spotIdCounts)
      .filter(([_, count]) => count === categories.length)
      .map(([spotId]) => Number(spotId));

    if (matchedSpotIds.length === 0) return []; // 없으면 바로 반환

    // 4️⃣ 해당 SpotId로 Spot 조회
    const spots = await prisma.spot.findMany({
      where: {
        spotId: { in: matchedSpotIds },
        isPublic: 'PUBLIC',
      },
      select: {
        spotId: true,
        spotName: true,
        imageUrl: true,
        extraInfo: true,
        createdAt: true,
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
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
      skip: offset,
      take: pageSize,
    });

    return spots;
  };

  // 명소 수정
  updateSpot = async (extraInfo, spotId, categories) => {
    const spot = await prisma.spot.update({
      where: {
        spotId,
      },
      data: {
        ...(extraInfo && { extraInfo }),
      },
    });
    // const existedCategory = await prisma.spotCategory.findMany({
    //   where: {
    //     spot: {
    //       spotId,
    //     },
    //   },
    // });
    // console.log(existedCategory);
    // if (categories) {
    //   categories.map(async (category) => {
    //     const spotCategory = await prisma.spotCategory.update({
    //       data: {
    //         spotId: spot.spotId,
    //         categoryId: Number(category),
    //       },
    //     });
    //   });
    // }
  };

  // 내가 올린 명소인지
  getMySpot = async (spotId, userId) => {
    const spot = await prisma.spot.findFirst({
      where: {
        spotId,
        userId,
      },
    });
    return spot;
  };

  getCategoriesByIds = async (ids) => {
    return await prisma.category.findMany({
      where: {
        categoryId: {
          in: ids,
        },
      },
    });
  };
}

export default SpotRepository;
