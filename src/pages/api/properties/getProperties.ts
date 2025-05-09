import dbConnect from "@/lib/dbConnect";
import Property from "@/models/Property";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const { location } = req.query;

    try {
      let query = {};
      if (location) {
        query = { location: location.toString() };
      }

      const properties = await Property.find(query).lean();
      return res.status(200).json(properties);
    } catch (err) {
      console.error("Error fetching properties:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}