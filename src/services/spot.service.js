class SpotService {
  constructor(spotRepository) {
    this.spotRepository = spotRepository;
  }
  // 명소 등록
  setSpot = async (spotName, region) => {
    const setSpot = await this.spotRepository.setSpot(spotName, region);
    console.log('he');

    return {
      spotId: setSpot.spotId,
      spotName: setSpot.spotName,
      region: setSpot.region,
      like: setSpot.like,
    };
  };

  // 전체 명소 조회
  getAllSpot = async (region) => {
    const getAllSpot = await this.spotRepository.getAllSpot(region);

    const AllSpot = getAllSpot.map((spot) => ({
      spotId: spot.spotId,
      spotName: spot.spotName,
      region: spot.region,
      like: spot.like,
    }));
    return AllSpot;
  };

  // 상세 명소 조회
  getOneSpot = async (spotId) => {
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);

    return {
      spotId: getOneSpot.spotId,
      spotName: getOneSpot.spotName,
      region: getOneSpot.region,
      like: getOneSpot.like,
    };
  };
}

export default SpotService;
