class MedicineDTO {
  constructor(medicine) {
    this.id = medicine.medicine_id;
    this.name = medicine.trade_name;
    this.isPrescriptionRequired = Boolean(medicine.requires_prescription);
    // За потреби можна додати мапінг повних назв виробника та категорії
  }
}

module.exports = MedicineDTO;
