const mongoose = require('mongoose');

const supplierListSchema = new mongoose.Schema({
  SupId: { type: String, required: true, unique: true }, // Custom supplier ID
  SupName: { type: String, required: true },
  items: [{ type: String }], // List of item IDs (custom IDs)
  description: { type: String, required: true },
});

module.exports = mongoose.model('SupplierList', supplierListSchema);

