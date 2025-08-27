const {model} = require("mongoose");
const {PositionsSchema} = require("../schemas/PositionsSchema");

const PositionsModel = new model("Positions", PositionsSchema);

module.exports = {PositionsModel};