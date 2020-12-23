import { Sequelize, DataTypes } from "sequelize";

export function shemaTypeTaxpayer(sequealize: Sequelize) { 
  return sequealize.define("tbl_type_taxpayer", {
    taxpayer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taxpayer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxpayer_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
}
