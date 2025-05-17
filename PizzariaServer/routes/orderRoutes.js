const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


router.post('/', async (req, res) => {
    try {
        const { customerName, phone, address, items, totalPrice } = req.body;
        const newOrder = new Order({ customerName, phone, address, items, totalPrice });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.pizzaId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;