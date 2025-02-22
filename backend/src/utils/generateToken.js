import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateRandomToken = () => crypto.randomInt(100000, 999999);

const generateJWT = (payload) =>
  jwt.sign(
    {
      data: payload,
    },
    "prayojan",
    { expiresIn: "15d" }
  );

const verifyJWT = (token) => jwt.verify(token,"prayojan");

export { generateJWT, generateRandomToken, verifyJWT };
