import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import { succes, error } from "../controllers/response";

export const tokenValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  // Verifica Llegada de token
  if (!token) return error(req, res, "No Autorizado", 401);
  // Remplaza El bearer por defecto
  const Btoken = token.replace("Bearer ", "");
  // Verificacion de token
  jwt.verify(
    Btoken,
    process.env.SECRET || "Tokentest",
    function (err, decoded: any) {
      if (err) return error(req, res, "No Autorizado", 401);

      if (decoded.user.valid == true) {
        req.params.useid = decoded.user.id;
        next();
      } else {
        error(req, res, "No Autorizado", 401);
      }
    }
  );
};
