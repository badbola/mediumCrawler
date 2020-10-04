const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "gocomet");
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      messgae: "Login failed",
    });
  }
};
