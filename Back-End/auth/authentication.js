import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers?.authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN,
      async (err, tokenDataDecode) => {
        if (err) {
          next();
        }
        req.user = tokenDataDecode;
        next();
      }
    );
  } else {
    next();
  }
};

export default checkToken;
