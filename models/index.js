// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import Sequelize from 'sequelize';
// import process from 'process';
// import { createRequire } from 'module'; // createRequire 사용
// const require = createRequire(import.meta.url);

// // Sequelize CLI에서 사용하는 config.json 로드
// const configJson = require('../config/config.js');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = configJson[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config,
//   );
// }

// const modelFiles = fs.readdirSync(__dirname).filter((file) => {
//   return (
//     file.indexOf('.') !== 0 &&
//     file !== basename &&
//     file.slice(-3) === '.js' &&
//     file.indexOf('.test.js') === -1
//   );
// });

// for (const file of modelFiles) {
//   const model = (await import(path.join(__dirname, file))).default(
//     sequelize,
//     Sequelize.DataTypes,
//   );
//   db[model.name] = model;
// }

// for (const modelName of Object.keys(db)) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// }

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;
