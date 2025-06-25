import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Company from "../models/Company";
import Developer from "../models/Developer";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Tipi i përmbajtjes që presim nga JWT
interface JwtPayload {
  id: string;
  type: "company" | "developer";
}

// Shtojmë `user` dhe `userType` në objektin Request që të përdoret globalisht
declare global {
  namespace Express {
    interface Request {
      user?: { _id: string };
      userType?: "company" | "developer";
    }
  }
}

// ✅ Middleware për verifikimin e token-it
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { _id: decoded.id };
    req.userType = decoded.type;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

// ✅ Vetëm për kompani
const isCompany = (req: Request, res: Response, next: NextFunction) => {
  if (req.userType !== "company") {
    return res.status(403).json({
      success: false,
      error: "Access denied. Companies only.",
    });
  }
  next();
};

// ✅ Vetëm për developerë
const isDeveloper = (req: Request, res: Response, next: NextFunction) => {
  console.log("userType:", req.userType, "user:", req.user);
  if (req.userType !== "developer") {
    return res.status(403).json({
      success: false,
      error: "Access denied. Developers only.",
    });
  }
  next();
};

// ✅ Kontrollo nëse kompania është e verifikuar
const isVerifiedCompany = async (req: Request, res: Response, next: NextFunction) => {
  if (req.userType !== "company") {
    return res.status(403).json({
      success: false,
      error: "Access denied. Companies only.",
    });
  }

  try {
    const company = await Company.findById(req.user?._id);
    if (!company?.isVerified) {
      return res.status(403).json({
        success: false,
        error: "Company not verified",
      });
    }

    let websiteDomain = "";
    try {
      if (company.website) {
        websiteDomain = new URL(
          company.website.startsWith("http") ? company.website : "http://" + company.website
        ).hostname.replace('www.', '');
      }
    } catch (e) {
      websiteDomain = "";
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Failed to validate company verification",
    });
  }
};

// ✅ Kontrollo nëse developeri është i verifikuar
const isVerifiedDeveloper = async (req: Request, res: Response, next: NextFunction) => {
  if (req.userType !== "developer") {
    return res.status(403).json({
      success: false,
      error: "Access denied. Developers only.",
    });
  }
  try {
    const developer = await Developer.findById(req.user?._id);
    if (!(developer as any)?.isVerified) {
      return res.status(403).json({
        success: false,
        error: "Developer not verified",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Failed to validate developer verification",
    });
  }
};

// ✅ Eksporto middleware-t
export const authMiddleware = {
  verifyToken,
  isCompany,
  isDeveloper,
  isVerifiedCompany,
  isVerifiedDeveloper,
};
