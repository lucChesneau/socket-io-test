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
        },
        username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
        },
        email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
        },
        password: {
                type: DataTypes.STRING,
                allowNull: false
        }
      }, {
        // Other model options go here
        tableName: 'users',
        underscored: true
      });

export default User;