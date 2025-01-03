'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('citys', [
      { cityId: 1, cityName: '서울' },
      { cityId: 2, cityName: '인천' },
    ]);

    const seoulDistricts = [
      '종로구',
      '중구',
      '용산구',
      '성동구',
      '광진구',
      '동대문구',
      '중랑구',
      '성북구',
      '강북구',
      '도봉구',
      '노원구',
      '은평구',
      '서대문구',
      '마포구',
      '양천구',
      '강서구',
      '구로구',
      '금천구',
      '영등포구',
      '동작구',
      '관악구',
      '서초구',
      '강남구',
      '송파구',
      '강동구',
    ];
    const incheonDistricts = [
      '중구',
      '동구',
      '미추홀구',
      '연수구',
      '남동구',
      '부평구',
      '계양구',
      '서구',
      '강화군',
      '옹진군',
    ];

    const incheonDistrictsData = incheonDistricts.map((district, index) => ({
      districtId: index + 1,
      city_cityId: 2, // cityId는 인천의 ID,
      districtName: district,
    }));
    const seoulDistrictsData = seoulDistricts.map((district, index) => ({
      districtId: index + 11,
      city_cityId: 1, // cityId는 서울의 ID
      districtName: district,
    }));
    await queryInterface.bulkInsert('districts', incheonDistrictsData);
    await queryInterface.bulkInsert('districts', seoulDistrictsData);
  },

  async down(queryInterface, Sequelize) {},
};
