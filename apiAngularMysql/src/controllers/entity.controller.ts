import { pool, shemaentity } from "../database/database";
import { Request, Response } from "express";
import { succes, error } from "./response";
export class CrudEntity {
  // Obtener por id
  static async findByid(req: Request, res: Response) {
    if (!req.params.id) {
      error(req, res, "ID Not found", 404);
      return;
    }
    try {
      const id = req.params.id;
      shemaentity
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
      shemaentity
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
      shemaentity
        .create(req.body)
        .then((data) => {
          succes(req, res, "Entidad Creado Exitosamente", 200);
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

      shemaentity
        .update(req.body, {
          where: { entity_id: id },
        })
        .then((data) => {
          succes(req, res, "Entidad Actualizado Correctamente", 200);
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
      shemaentity
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
      shemaentity
        .findAndCountAll({
          where: req.body.filter,
          include: [
            "relationship_entity_identification",
            "relationship_entity_taxpayer",
          ],
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
