const express = require('express');
const router = express.Router();
const SupplierOrderController = require('../Controllers/SupplierOrderController');

// Routes for supplier operations


// Create a new Supplier Order
router.post('/', SupplierOrderController.createSupplierOrder);

// Get all Supplier Orders
router.get('/', SupplierOrderController.getAllSupplierOrders);

// Get a Supplier Order by ID
router.get('/:id', SupplierOrderController.getSupplierOrderById);

// Update Supplier Order Status by ID
router.put('/:id/status', SupplierOrderController.updateSupplierOrderStatus);

// Delete a Supplier Order by ID
router.delete('/:id', SupplierOrderController.deleteSupplierOrder);

module.exports = router;
