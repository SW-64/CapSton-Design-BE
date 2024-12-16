class SpotService {
  constructor(spotRepository) {
    this.spotRepository = spotRepository;
  }
  setSpot = async (spotName, region) => {
    //만약 전부 0원이라면 랭킹정보가 없다고 나오게 하길
    const setSpot = await this.spotRepository.setSpot(spotName, region);
    console.log('he');

    return {
      spotId: setSpot.spotId,
      spotName: setSpot.spotName,
      region: setSpot.region,
      like: setSpot.like,
    };
  };
}

export default SpotService;
