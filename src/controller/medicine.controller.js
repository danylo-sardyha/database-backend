const medicineService = require("../services/medicine.service");

class MedicineController {
  async getAll(req, res) {
    try {
      const data = await medicineService.getAllMedicines();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const id = await medicineService.createMedicine(req.body);
      res.status(201).json({ message: "Medicine created", id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await medicineService.updateMedicine(
        req.params.id,
        req.body,
      );
      if (updated) res.json({ message: "Medicine updated" });
      else res.status(404).json({ message: "Not found" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await medicineService.deleteMedicine(req.params.id);
      if (deleted) res.json({ message: "Medicine deleted" });
      else res.status(404).json({ message: "Not found" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // М:1 Endpoint
  async getByCategory(req, res) {
    try {
      const data = await medicineService.getMedicinesByCategory(
        req.params.categoryId,
      );
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // М:М Endpoint
  async getIngredients(req, res) {
    try {
      const data = await medicineService.getIngredients(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new MedicineController();
