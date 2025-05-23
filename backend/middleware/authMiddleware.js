const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; 

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access only" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

