import jwt from "jsonwebtoken";

const generateTokens = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};

export default generateTokens;

