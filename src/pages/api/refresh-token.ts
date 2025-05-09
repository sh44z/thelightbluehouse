import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const refreshToken = req.cookies.refreshToken; // Get the refresh token from the cookie

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized: No refresh token provided" });
    }

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      interface DecodedToken {
        userId: string;
      }
      const userId = (decoded as DecodedToken).userId;

      // Issue a new access token
      const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });

      return res.status(200).json({ accessToken });
    } catch (err) {
      console.error("Invalid refresh token:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid refresh token" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}