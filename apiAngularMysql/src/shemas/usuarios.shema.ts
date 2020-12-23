import { Sequelize, DataTypes } from "sequelize";

export function shemaUsers(sequealize: Sequelize) {
  return sequealize.define("tbl_users", {
    use_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    use_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    use_email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    use_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    use_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
}
