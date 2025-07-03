const {model} = require('mongoose');
const {positionSchema} = require('../schemas/positionSchema');


const Position = model('Position' , positionSchema);

module.exports = Position;