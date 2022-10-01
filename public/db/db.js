import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('socketdatabase', 'root', 'root', {dialect: 'mysql', host: 'localhost', port: 8889});
export default sequelize;
