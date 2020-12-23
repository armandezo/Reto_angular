require("dotenv").config();
import jwt from "jsonwebtoken";
export class JsonWebToken {
  // Creacion del json web token
  static sign(data: any) {
    let secretKey = process.env.SECRET as string;
    return jwt.sign(
      {
        user: data,
      },
      secretKey,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
  }
  // Verificacion del json web token
  public verify(token: string) {
    let secretKey = process.env.SECRET as string;
    try {
      return jwt.verify(token, secretKey) as string;
    } catch (error) {
      return "Token_not_valid";
      console.log(error);
    }
  }
}
