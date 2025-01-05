import { faker } from '@faker-js/faker';

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

console.log(spots);
