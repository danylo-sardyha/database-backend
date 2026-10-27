const express = require("express");
const router = express.Router();
const controller = require("../controller/medicine.controller");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

router.get("/category/:categoryId", controller.getByCategory);
router.get("/:id/ingredients", controller.getIngredients);

module.exports = router;
