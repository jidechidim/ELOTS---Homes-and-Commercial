import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (without password)
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, name: true, email: true, role: true },
      });

      if (!req.user) {
        return res.status(401).json({ error: "User not found" });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
};

export const requireSellerOrAgent = (req, res, next) => {
  if (req.user.role === "seller" || req.user.role === "agent" || req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Access denied: Only sellers or agents can perform this action" });
  }
};
