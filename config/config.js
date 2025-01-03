'use strict';

import { DATABASE_HOST, ROOT_PASSWORD } from '../src/constants/env.constant.js';

const config = {
  development: {
    username: 'root',
    password: ROOT_PASSWORD,
    database: 'prisma_crud',
    host: DATABASE_HOST,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: 'root',
    password: ROOT_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: 'root',
    password: ROOT_PASSWORD,
    database: 'database_production',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //   ca: fs.readFileSync(new URL('./mysql-ca-main.crt', import.meta.url)),
      // },
    },
  },
};

export default config;
