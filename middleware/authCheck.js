const jwt = require("jsonwebtoken");

module.exports = (res, req, next) => {
  try {
    const token = req.header.authorization;
    const decoded = jwt.verify(token, "gocomet");
    (req.userData = decoded), next();
  } catch (error) {
    return res.status(401).json({
      messgae: "Login failed",
    });
  }
};
