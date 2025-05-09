import multer from "multer";

// Configure multer to handle the `images` field
const upload = multer({
  storage: multer.memoryStorage(), // Use memory storage for simplicity
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

export const multerMiddleware = upload.fields([
  { name: "images", maxCount: 10 }, // Allow up to 10 files for the `images` field
]);

export const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};