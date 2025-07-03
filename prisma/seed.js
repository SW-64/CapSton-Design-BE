import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('1234', 10);

  for (let i = 51; i <= 72; i++) {
    for (let j = 1; j <= 3; j++) {
      await prisma.interaction.create({
        data: {
          userId: i,
          spotId: j, // 1~3번 spot에 북마크
          type: 'BOOKMARK',
        },
      });
    }
  }
}

main()
  .then(() => {
    console.log('✅ 유저 더미 데이터 생성 완료');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
