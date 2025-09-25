import bcrypt from "bcrypt";
import prisma from "../config/db.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashed, role },
    });

    res.json({ token: generateToken(user.id), user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ token: generateToken(user.id), user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
