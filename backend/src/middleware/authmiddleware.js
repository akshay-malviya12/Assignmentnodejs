const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
// // Middleware to authenticate user
function authenticateUser(req, res, next) {
  console.log("req", req);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  console.log("token", token);
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, secretKey, (err, decoded) => {
    console.log("error", err);
    if (err) return res.status(401).json({ message: err.message });
    req.user = decoded;
    next();
  });
}
// // Middleware to authorize user based on role
function authorizeUser(types) {
  return (req, res, next) => {
    console.log("userssss", req, "dghgsdhgsdhdasasas", req.user);

    const { role } = req.user || {};
    console.log("roles", role, "typess", types);
    if (!role || !role.includes(types)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
}

module.exports = {
  authenticateUser,
  authorizeUser,
};
