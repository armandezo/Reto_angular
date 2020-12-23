import { succes, error } from "./response";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { shemauser } from "../database/database";
import { JsonWebToken } from "../libs/jwt";
export class login {
  static signIn(req: Request, res: Response) {
    // Verificacion de parametros
    if (!req.body.email || !req.body.password) {
      succes(req, res, "Usuario o Contraseña Invalida", 400);
      return;
    }
    // consulta del usuario con el correo electronico
    shemauser
      .findAndCountAll({
        where: { use_email: req.body.email },
        attributes: ["use_name", "use_password", "use_id", "is_valid"],
      })
      .then((data) => {
        try {
          const valid: any = data.rows[0];
          // Valida que haya algun usuario con el correo
          if (data.rows.length == 0) {
            succes(req, res, "Usuario o Contraseña Invalida", 400);
            return;
            // Verifica que el usuario no este duplicado
          } else if (data.rows.length > 1) {
            succes(req, res, "Usuario Duplicado", 400);
            return;
            // Valida que el usuario este valido o activo
          } else if (!valid.is_valid) {
            succes(req, res, "Usuario Inactivo", 400);
            return;
          }
          // Obtiene la contraseña enviada y la guardad en la bd y las compara
          const password = bcrypt.compareSync(
            req.body.password,
            valid.use_password
          );
          // Si es valida crea el token
          if (password === true) {
            const json = {
              id: valid.use_id,
              name: valid.use_name,
              valid: valid.is_valid,
            };
            const token = JsonWebToken.sign(json);

            succes(req, res, token, 200);
          } else {
            succes(req, res, "Usuario o Contraseña Invalida", 400);
          }
        } catch (err) {
          console.log(err);
          error(req, res, err, 500);
        }
      });
  }

  static logout(req: Request, res: Response) {
    if (!req.params.useid) {
      error(req, res, "No se ha enviado ningun id", 400);
      return;
    }
    const update = {
      use_status: 0,
    };
    shemauser
      .update(update, {
        where: { use_id: req.params.useid },
      })
      .then((data) => {
        succes(req, res, "Sesison Finalizada", 200);
      })
      .catch((err) => {
        error(req, res, err, 500);
      });
  }
}
