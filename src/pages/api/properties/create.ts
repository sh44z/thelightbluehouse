import dbConnect from "@/lib/dbConnect";
import Property from "@/models/Property";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable"
import path from "path";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
      multiples: true, // Allow multiple file uploads
    });

    form.parse(req, async (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ message: "Error processing form data." });
      }

      console.log("Fields received:", fields);

      // Extract and verify the token
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided." });
      }

      let userId;
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== "string" && "userId" in decoded) {
          userId = decoded.userId;
        } else {
          throw new Error("Invalid token payload.");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid token." });
      }

      try {
        // Extract fields and ensure they are in the correct format
        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
        const country = Array.isArray(fields.country) ? fields.country[0] : fields.country;
        const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
        const location = Array.isArray(fields.location) ? fields.location[0] : fields.location;
        const pricePerNight = Array.isArray(fields.pricePerNight)
          ? parseFloat(fields.pricePerNight[0])
          : parseFloat(fields.pricePerNight);
        const maxGuests = Array.isArray(fields.maxGuests)
          ? parseInt(fields.maxGuests[0], 10)
          : parseInt(fields.maxGuests, 10);
        const houseRules = Array.isArray(fields.houseRules) ? fields.houseRules[0] : fields.houseRules;
        const amenities = Array.isArray(fields.amenities) ? JSON.parse(fields.amenities[0]) : JSON.parse(fields.amenities);

        // Validate required fields
        if (
          !title ||
          !description ||
          !country ||
          !city ||
          !location ||
          !pricePerNight ||
          !maxGuests ||
          !houseRules ||
          !amenities
        ) {
          return res.status(400).json({ message: "All fields are required." });
        }

        // Process uploaded images
        const imagePaths = [];
        if (files.images) {
          const images = Array.isArray(files.images) ? files.images : [files.images];
          for (const image of images) {
            const filePath = path.relative(process.cwd(), image.filepath);
            imagePaths.push(filePath.replace("public\\", "").replace("public/", ""));
          }
        }

        // Automatically set the owner to the logged-in user's _id
        const ownerId = new mongoose.Types.ObjectId(userId);

        const newProperty = new Property({
          title,
          description,
          country,
          city,
          location,
          pricePerNight,
          maxGuests,
          houseRules,
          images: imagePaths, // Save relative paths to the database
          amenities, // Already parsed as an array
          owner: ownerId, // Automatically set the owner
        });

        await newProperty.save();
        return res.status(201).json({ message: "Property listed successfully.", property: newProperty });
      } catch (error) {
        console.error("Error saving property:", error);
        return res.status(500).json({ message: "Internal server error." });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}