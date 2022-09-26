import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const User = sequelize.define('user', {
        // Model attributes are defined here
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING
          // allowNull defaults to true
        }
      }, {
        // Other model options go here
        tableName: 'users',
        underscored: true
      });

export default User;