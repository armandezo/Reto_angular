import { tokenValidate } from "./../libs/validatetoken";
import { Router } from "express";
import { CrudEntity } from "../controllers/entity.controller";
import { CrudIdentification } from "../controllers/identification.controller";
import { login } from "../controllers/login.controller";
import { CrudTaxpayer } from "../controllers/taxpayer.controller";
import { CrudUser } from "../controllers/user.controller";

const router: Router = Router();

// Usuarios
router.get("/users", tokenValidate, CrudUser.findAll);
router.get("/users/:id", tokenValidate, CrudUser.findByid);
router.post("/users", tokenValidate, CrudUser.create);
router.post("/users/filter", tokenValidate, CrudUser.findQuery);
router.put("/users/:id", tokenValidate, CrudUser.update);
router.delete("/users/:id", tokenValidate, CrudUser.delete);

// Identifiacion
router.get("/identification", tokenValidate, CrudIdentification.findAll);
router.get("/identification/:id", tokenValidate, CrudIdentification.findByid);
router.post("/identification", tokenValidate, CrudIdentification.create);
router.post(
  "/identification/filter",
  tokenValidate,
  CrudIdentification.findQuery
);
router.put("/identification/:id", tokenValidate, CrudIdentification.update);
router.delete("/identification/:id", tokenValidate, CrudIdentification.delete);

// taxpayer
router.get("/taxpayer", tokenValidate, CrudTaxpayer.findAll);
router.get("/taxpayer/:id", tokenValidate, CrudTaxpayer.findByid);
router.post("/taxpayer", tokenValidate, CrudTaxpayer.create);
router.post("/taxpayer/filter", tokenValidate, CrudTaxpayer.findQuery);
router.put("/taxpayer/:id", tokenValidate, CrudTaxpayer.update);
router.delete("/taxpayer/:id", tokenValidate, CrudTaxpayer.delete);

// entity
router.get("/entity", tokenValidate, CrudEntity.findAll);
router.get("/entity/:id", tokenValidate, CrudEntity.findByid);
router.post("/entity", tokenValidate, CrudEntity.create);
router.post("/entity/filter", tokenValidate, CrudEntity.findQuery);
router.put("/entity/:id", tokenValidate, CrudEntity.update);
router.delete("/entity/:id", tokenValidate, CrudEntity.delete);

router.post("/login", login.signIn);

export default router;
