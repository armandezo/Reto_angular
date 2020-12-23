import * as sequelize from "sequelize";
import { shemaEntity } from "../shemas/entity.shema";
import { shemaIdentification } from "../shemas/identification.shema";
import { shemaTypeTaxpayer } from "../shemas/type_taxpayer.shema";
import { shemaUsers } from "../shemas/usuarios.shema";

const Sequealize = require("sequelize");

require("dotenv").config();

// Configuracion Credenciales Base Datos
export const pool = new Sequealize(
  process.env.DB || "",
  process.env.DTUSER || "",
  process.env.PASSWORD || "",
  {
    port: 3306,
    host: process.env.HOST || "",
    dialect: "mysql",
    pool: {
      max: 4000,
      min: 2,
      idle: 10000,
      acquire: 60000,
      evict: 1000,
    },
  }
);
// Definicion de esquemas para la base de datos
export const shemauser = shemaUsers(pool);
export const shemaidentification = shemaIdentification(pool);
export const shematypestaxpayer = shemaTypeTaxpayer(pool);
export const shemaentity = shemaEntity(pool);

// Relaciones de la base de datos
shemaentity.belongsTo(shemaidentification, {
  foreignKey: "id_identification",
  as: "relationship_entity_identification",
});
shemaentity.belongsTo(shematypestaxpayer, {
  foreignKey: "id_taxpayer",
  as: "relationship_entity_taxpayer",
});
