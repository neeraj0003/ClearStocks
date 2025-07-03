const {model} = require('mongoose');
const {OrderSchema} = require('../schemas/OrdersSchema');

const Order = model('Order', OrderSchema);

module.exports = Order;