import dbConnect from "@/lib/dbConnect";
import Property from "@/models/Property";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Fetch unique locations from the Property model
      const locations = await Property.distinct("location");
      return res.status(200).json(locations);
    } catch (err) {
      console.error("Error fetching locations:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}