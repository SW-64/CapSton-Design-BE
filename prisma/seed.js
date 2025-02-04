import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import imageUploader from '../src/middlewares/image-upload.middleware.js';
const prisma = new PrismaClient();

export async function createRandomSpot() {
  const imageUrl = await imageUploader.array('image', 10);
  return {
    spotName: faker.company.name(),
    districtId: Math.floor(Math.random() * 35) + 1,
    like: Math.floor(Math.random() * 99),
    imageUrl: imageUrl,
  };
}

export const spots = faker.helpers.multiple(createRandomSpot, {
  count: 10000,
});

async function main() {
  // 모든 데이터 지우기
  await prisma.spot.deleteMany({});
  await prisma.district.deleteMany({});
  await prisma.city.deleteMany({});

  // city 더미데이터
  await prisma.city.createMany({
    data: [
      { cityId: 1, cityName: '서울' },
      { cityId: 2, cityName: '인천' },
    ],
  });

  // district 더미데이터
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
    cityId: 2, // cityId는 인천의 ID,
    districtName: district,
  }));
  const seoulDistrictsData = seoulDistricts.map((district, index) => ({
    districtId: index + 11,
    cityId: 1, // cityId는 서울의 ID
    districtName: district,
  }));
  await prisma.district.createMany({
    data: incheonDistrictsData,
  });
  await prisma.district.createMany({
    data: seoulDistrictsData,
  });

  // 장소 더미데이터
  // await prisma.spot.createMany({
  //   data: spots,
  // });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
