const medicineDAO = require("../dao/medicine.dao");
const MedicineDTO = require("../dtos/medicine.dto");

class MedicineService {
  async getAllMedicines() {
    const medicines = await medicineDAO.getAll();
    return medicines.map((med) => new MedicineDTO(med));
  }

  async createMedicine(data) {
    return await medicineDAO.create(data);
  }

  async updateMedicine(id, data) {
    return await medicineDAO.update(id, data);
  }

  async deleteMedicine(id) {
    return await medicineDAO.delete(id);
  }

  async getMedicinesByCategory(categoryId) {
    return await medicineDAO.getByCategory(categoryId);
  }

  async getIngredients(medicineId) {
    return await medicineDAO.getIngredientsByMedicine(medicineId);
  }
}

module.exports = new MedicineService();
