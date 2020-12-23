import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes";
import { pool } from "./database/database";

async function init() {
  // Inicializacion Servidor
  const app = express();
  // Llamado de conexion a la base de datos
  pool
    .sync({ force: false })
    .then(() => {
      console.log("Database sync");
    })
    .catch((err: any) => {
      console.log("Not sync Database");
      console.log(err);
    });
  // Uso cors para evitar politicas de cors
  app.use(cors());
  // Uso json en la aplicacion
  app.use(bodyParser.json());
  // Inicializacion de rutas
  app.use("/api", router);
  // Configuracion de puerto para servidor
  const PORT = process.env.PORT || 3000;
  // Inicicialzacion del servidor por el puerto determinado
  app.listen(PORT, () => {
    console.log("Servidor Corriendo en puerto", PORT);
  });
}
init();
