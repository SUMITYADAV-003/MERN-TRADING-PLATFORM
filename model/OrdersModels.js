const {model} = require("mongoose");
const {OrdersSchema} = require("../schemas/OrdersSchema");

const OrdersModels = new model("Order", OrdersSchema);

module.exports = {OrdersModels}