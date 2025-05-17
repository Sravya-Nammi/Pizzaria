const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');


router.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.json(pizzas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const { name, ingredients, price, image } = req.body;
        const newPizza = new Pizza({ name, ingredients, price, image });
        await newPizza.save();
        res.status(201).json(newPizza);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;