const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
  id: Number,
  tname: String,
  price: Number,
  image: String
});

module.exports = mongoose.model('Topping', toppingSchema);