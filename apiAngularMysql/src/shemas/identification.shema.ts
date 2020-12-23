import { Sequelize, DataTypes } from "sequelize";

export function shemaIdentification(sequealize: Sequelize) {
  return sequealize.define("tbl_identification", {
    identification_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    identification_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identification_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    identification_description: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    identification_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
}
