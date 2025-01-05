import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export function createRandomSpot() {
  return {
    spotName: faker.company.name(),
    districtId: Math.floor(Math.random() * 36),
    like: Math.floor(Math.random() * 99),
    imageUrl: faker.image.url(),
  };
}

export const spots = faker.helpers.multiple(createRandomSpot, {
  count: 100,
});

async function main() {
  const alice = await prisma.spot.createMany({
    data: spots,
  });

  console.log({ alice });
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
