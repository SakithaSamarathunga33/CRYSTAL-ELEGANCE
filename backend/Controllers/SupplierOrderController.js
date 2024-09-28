const SupplierOrder = require('../Model/SupplierOrderModel'); // Adjust the path as necessary
const Gem = require('../Model/GemModel'); // Adjust the path as necessary
const SupplierList = require('../Model/SupplierListModel'); // Adjust the path to the correct model

// Create a new Supplier Order
exports.createSupplierOrder = async (req, res) => {
    const { SupOrderID, GID, quantity, InvID, SupID, status, description } = req.body;

    try {
        // Check if the supplier exists
        const supplierExists = await SupplierList.findOne({ SupId: SupID });
        if (!supplierExists) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Validate that the gem exists
        const gem = await Gem.findOne({ GID }); // Find gem by GID
        if (!gem) {
            return res.status(404).json({ message: 'Gem not found' });
        }

        // Create the supplier order
        const supplierOrder = new SupplierOrder({
            SupOrderID,
            GID,            // Use GID for gem reference
            quantity,
            InvID,
            SupID,
            status,
            description,
        });

        await supplierOrder.save();
        res.status(201).json(supplierOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Supplier Orders
exports.getAllSupplierOrders = async (req, res) => {
    try {
        const orders = await SupplierOrder.find().populate('GID SupID'); // Populate references
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a Supplier Order by ID
exports.getSupplierOrderById = async (req, res) => {
    try {
        const order = await SupplierOrder.findById(req.params.id).populate('GID SupID');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Supplier Order Status by ID
exports.updateSupplierOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await SupplierOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Supplier Order by ID
exports.deleteSupplierOrder = async (req, res) => {
    try {
        const order = await SupplierOrder.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).json(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
