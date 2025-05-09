import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file uploads
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing files:", err);
        return res.status(500).json({ message: "Error uploading files" });
      }

      const imagePaths = Object.values(files).map((file: any) =>
        `/uploads/${path.basename(file.filepath)}`
      );

      return res.status(200).json({ imagePaths });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}