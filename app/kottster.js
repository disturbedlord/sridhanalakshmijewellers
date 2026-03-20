import { GenericError } from "../APIHelper/commonMethods.js";
import { LogError } from "../Logger/LogHelper.js";

export const UploadImage = (req, res) => {
  try {
    console.log("req.file:", req.file, req.file.filename);
    console.log("req.body:", req.body);

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const fileName = `/assets/images/products/${req.file.filename}`;
    console.log(fileName);
    res.json({ success: true, filename: fileName });
  } catch (err) {
    LogError("UploadImage", err);
    GenericError(res);
  }
};
