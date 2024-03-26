import { Router } from "express";
import {
  getImages,
  addImage,
  updateImage,
  deleteImage,
  batchImages,
} from "../controllers/image/index.js";

const router: Router = Router();

router.get("/images", getImages);

router.post("/images", addImage);

router.put("/images/:id", updateImage);

router.delete("/images/:id", deleteImage);

router.post("/batch-images", batchImages);

export default router;
