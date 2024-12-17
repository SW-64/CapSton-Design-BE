class SpotRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 명소 등록
  setSpot = async (spotName, region) => {
    return await this.prisma.spot.create({
      data: {
        spotName: spotName,
        region: region,
      },
    });
  };

  // 전체 명소 조회
  getAllSpot = async (region) => {
    return await this.prisma.spot.findMany({
      where: {
        region: region,
      },
    });
  };

  // 상세 명소 조회
  getOneSpot = async (spotId) => {
    return await this.prisma.spot.findUnique({
      where: {
        spotId: spotId,
      },
    });
  };

  // 명소 이름으로 명소 찾기
  findSpotName = async (spotName) => {
    return await this.prisma.spot.findUnique({
      where: {
        spotName: spotName,
      },
    });
  };

  // 명소 삭제
  deleteSpot = async (spotId) => {
    return await this.prisma.spot.delete({
      where: {
        spotId: spotId,
      },
    });
  };
}

export default SpotRepository;
