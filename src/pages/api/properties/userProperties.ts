import dbConnect from "@/lib/dbConnect";
import Property from "@/models/Property";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    let userId;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (typeof decoded !== "string" && "userId" in decoded) {
        userId = decoded.userId;
      } else {
        throw new Error("Invalid token payload");
      }
      console.log("Decoded userId from token:", userId); // Debugging: Log the userId
    } catch (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    try {
      // Convert userId to ObjectId
      const userObjectId = new mongoose.Types.ObjectId(userId);
      console.log("User Object ID:", userObjectId); // Debugging: Log the ObjectId

      // Query the database for properties owned by the user
      const properties = await Property.find({ owner: userObjectId })
        .select("title images country location city pricePerNight")
        .lean();

      console.log("Database Query:", { owner: userObjectId }); // Debugging: Log the query
      console.log("Fetched Properties:", properties); // Debugging: Log the fetched properties

      return res.status(200).json(properties);
    } catch (err) {
      console.error("Error fetching user properties:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}