const { model } = require('mongoose');
const {holdingSchema} = require("../schemas/holdingSchema");

const Holding =  model('Holding',holdingSchema);

module.exports = Holding;
