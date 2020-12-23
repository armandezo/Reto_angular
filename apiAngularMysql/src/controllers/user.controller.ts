import bcrypt from "bcrypt";
import { pool, shemauser } from "../database/database";
import { Request, Response } from "express";
import { succes, error } from "./response";
import { Iuser } from "../interface/user.interface";
export class CrudUser {
  // Obtener por id
  static async findByid(req: Request, res: Response) {
    if (!req.params.id) {
      error(req, res, "ID Not found", 404);
      return;
    }
    try {
      const id = req.params.id;
      shemauser
        .findByPk(id)
        .then((data) => {
          succes(req, res, data, 200);
        })
        .catch((err) => {
          error(req, res, err, 500);
        });
    } catch (err) {
      error(req, res, err, 500);
    }
  }
  // Obtener Todo
  static async findAll(req: Request, res: Response) {
    try {
      shemauser
        .findAndCountAll()
        .then((data) => {
          succes(req, res, data, 200);
        })
        .catch((err) => {
          error(req, res, err, 500);
        });
    } catch (err) {
      error(req, res, err, 500);
    }
  }
  // Crear

  static async create(req: Request, res: Response) {
    try {
      if (!req.body.use_name || !req.body.use_email || !req.body.ro_id) {
        res.status(400).send({
          message: "Invalida Data",
        });
        return;
      }
      const x = CrudUser.findEmail(req.body.use_email)
        .then((data: any) => {
          if (data.rows.length > 0) {
            succes(req, res, "El Usuario ya se encuentra  registrado", 400);
          } else {
            const bodyUser: Partial<Iuser> = {
              use_name: req.body.use_name,
              use_lastname: req.body.use_lastname,
              use_email: req.body.use_email,
              use_password: bcrypt.hashSync(req.body.use_password, 10),
              use_phone: req.body.use_phone,
              is_valid: req.body.is_valid,
            };
            shemauser
              .create(bodyUser)
              .then((data) => {
                succes(req, res, "Usuario Creado Exitosamente", 200);
              })
              .catch((err) => {
                error(req, res, err, 500);
              });
          }
        })
        .catch((err) => {
          error(req, res, err, 500);
        });
    } catch (err) {
      error(req, res, err, 500);
    }
  }
  // Actualizar
  static async update(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        res
          .send(400)
          .send({ message: "No se ha enviado un id para actualizar" });

        return;
      }
      const id = req.params.id;

      shemauser
        .update(req.body, {
          where: { use_id: id },
        })
        .then((data) => {
          succes(req, res, "Usuario Actualizado Correctamente", 200);
        })
        .catch((err) => {
          error(req, res, err, 500);
        });
    } catch (err) {
      error(req, res, err, 500);
    }
  }
  // Eliminar
  static async delete(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        res
          .send(400)
          .send({ message: "No se ha enviado un id para actualizar" });

        return;
      }
      const body = {
        is_valid: 0,
      };
      const id = req.params.id;
      shemauser
        .update(body, {
          where: { use_id: id },
        })
        .then((data) => {
          succes(req, res, data, 200);
        })
        .catch((err) => {
          error(req, res, err, 500);
        });
    } catch (err) {
      error(req, res, err, 500);
    }
  }
  // Buscar con filtros
  static async findQuery(req: Request, res: Response) {
    try {
      let limits = req.body.limit || 10;
      let page = req.body.page > 0 ? req.body.page * req.body.limit : 0;
      shemauser
        .findAndCountAll({
          where: req.body.filter,
          include: ["relationship_role_user"],
          offset: page,
          limit: limits,
        })
        .then((data) => {
          succes(req, res, data, 200);
        })
        .catch((err) => {
          error(req, res, err, 500);
        });
    } catch (err) {
      console.log(err);
      error(req, res, err, 500);
    }
  }
  static async findEmail(email: any) {
    try {
      return shemauser.findAndCountAll({
        where: { use_email: email },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
