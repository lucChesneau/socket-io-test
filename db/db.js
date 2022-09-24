import { Sequelize } from 'sequelize';

export default new Sequelize('socketdatabase', 'root', 'root', {dialect: 'mysql', host: 'localhost', port: 8889});
