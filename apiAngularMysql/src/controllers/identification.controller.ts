import bcrypt from "bcrypt";
import { pool, shemaidentification } from "../database/database";
import { Request, Response } from "express";
import { succes, error } from "./response";
import { Iuser } from "../interface/user.interface";
export class CrudIdentification {
  // Obtener por id
  static async findByid(req: Request, res: Response) {
    if (!req.params.id) {
      error(req, res, "ID Not found", 404);
      return;
    }
    try {
      const id = req.params.id;
      shemaidentification
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
      shemaidentification
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
      shemaidentification
        .create(req.body)
        .then((data) => {
          succes(req, res, "Identificación Creado Exitosamente", 200);
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

      shemaidentification
        .update(req.body, {
          where: { identification_id: id },
        })
        .then((data) => {
          succes(req, res, "Identifiacion Actualizado Correctamente", 200);
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
        identification_status: 0,
      };
      const id = req.params.id;
      shemaidentification
        .update(body, {
          where: { identification_id: id },
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
      shemaidentification
        .findAndCountAll({
          where: req.body.filter,
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
}
