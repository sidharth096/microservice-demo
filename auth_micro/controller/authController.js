import bcrypt from "bcrypt";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

class authController {
  static async register(req, res) {
    try {
      const payload = req.body;
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(payload.password, salt);

      console.log("payload", payload);
      console.log("payload.password", payload.password);

      const user = await prisma.user.create({ data: payload });

      return res
        .status(201)
        .json({ message: "User created successfully", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
        console.log("req.body", req.body);
        
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res
          .status(200)
          .json({
            message: "Login successful",
            access_token: `Bearer ${token}`,
          });
      }

      return res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async user (req , res){   
    const  user = req.user
    return res.status(200).json({user:user})
  }
}

export default authController;
