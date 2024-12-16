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
}

export default SpotRepository;
