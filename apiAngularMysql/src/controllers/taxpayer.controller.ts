import { pool, shematypestaxpayer } from "../database/database";
import { Request, Response } from "express";
import { succes, error } from "./response";
export class CrudTaxpayer {
  // Obtener por id
  static async findByid(req: Request, res: Response) {
    if (!req.params.id) {
      error(req, res, "ID Not found", 404);
      return;
    }
    try {
      const id = req.params.id;
      shematypestaxpayer
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
      shematypestaxpayer
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
      shematypestaxpayer
        .create(req.body)
        .then((data) => {
          succes(req, res, "Contribuyente Creado Exitosamente", 200);
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

      shematypestaxpayer
        .update(req.body, {
          where: { taxpayer_id: id },
        })
        .then((data) => {
          succes(req, res, "Contribuyente Actualizado Correctamente", 200);
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
        taxpayer_status: 0,
      };
      const id = req.params.id;
      shematypestaxpayer
        .update(body, {
          where: { taxpayer_id: id },
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
      shematypestaxpayer
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
