const db = require("../../config/db.config");

class MedicineDAO {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM medicines");
    return rows;
  }

  async getById(id) {
    const [rows] = await db.query(
      "SELECT * FROM medicines WHERE medicine_id = ?",
      [id],
    );
    return rows[0];
  }

  async create(medicineData) {
    const {
      trade_name,
      manufacturer_id,
      category_id,
      packaging_id,
      requires_prescription,
    } = medicineData;
    const [result] = await db.query(
      "INSERT INTO medicines (trade_name, manufacturer_id, category_id, packaging_id, requires_prescription) VALUES (?, ?, ?, ?, ?)",
      [
        trade_name,
        manufacturer_id,
        category_id,
        packaging_id,
        requires_prescription,
      ],
    );
    return result.insertId;
  }

  async update(id, medicineData) {
    const {
      trade_name,
      manufacturer_id,
      category_id,
      packaging_id,
      requires_prescription,
    } = medicineData;
    const [result] = await db.query(
      "UPDATE medicines SET trade_name = ?, manufacturer_id = ?, category_id = ?, packaging_id = ?, requires_prescription = ? WHERE medicine_id = ?",
      [
        trade_name,
        manufacturer_id,
        category_id,
        packaging_id,
        requires_prescription,
        id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await db.query(
      "DELETE FROM medicines WHERE medicine_id = ?",
      [id],
    );
    return result.affectedRows;
  }

  // М:1 - Усі ліки певної категорії
  async getByCategory(categoryId) {
    const [rows] = await db.query(
      `
            SELECT m.medicine_id, m.trade_name, c.category_name 
            FROM medicines m 
            JOIN categories c ON m.category_id = c.category_id 
            WHERE m.category_id = ?`,
      [categoryId],
    );
    return rows;
  }

  // М:М - Усі діючі речовини для конкретного препарату
  async getIngredientsByMedicine(medicineId) {
    const [rows] = await db.query(
      `
            SELECT ai.ingredient_name, mi.dosage 
            FROM active_ingredients ai 
            JOIN medicine_ingredients mi ON ai.ingredient_id = mi.ingredient_id 
            WHERE mi.medicine_id = ?`,
      [medicineId],
    );
    return rows;
  }
}

module.exports = new MedicineDAO();
