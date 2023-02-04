const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const web = require('../dbWeb.js'); 

let ProductSchema = new Schema({
  id: { type: String, required: true, index: true, unique: true },
  category: { type: String, required: true },
  title: { type: String, required: true, minlength: 1, maxlength: 100 },
  image: { type: String, required: false, minlength: 0, maxlength: 1000000 },
  price: {
    type: Schema.Types.Decimal128, 
    set: v => { return new mongoose.Types.Decimal128.fromString(v.toFixed(2)); },
    required: true,
  },
  priceId: { type: String },
  inventoryAmount: { type: Number, required: true, default: 0 },
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: web.user },
  shippable: { type: Boolean, required: true },
  weight: { type: Number },
  size: {
    width: { type: Number },
    length: { type: Number },
    height: { type: Number },
  },
});

let OrderSchema = new Schema({
  orderId: { type: String },
  paymentId: { type: String },
  customerId: { type: String },
  created: { type: Date, default: Date.now() },
  order: [{
    title: { type: String, required: true, minlength: 1, maxlength: 100 },
    price: {
      type: Schema.Types.Decimal128, 
      set: v => { return new mongoose.Types.Decimal128.fromString(v.toFixed(2)); },
      required: true,
    },
    quantity: { type: Number, required: true },
  }],
  total: {
    type: Schema.Types.Decimal128, 
    set: v => { return new mongoose.Types.Decimal128.fromString(v.toFixed(2)); },
    required: true,
  },
  shippingCost: {
    type: Schema.Types.Decimal128, 
    set: v => { return new mongoose.Types.Decimal128.fromString(v.toFixed(2)); },
    required: true,
  },
  tax: {
    type: Schema.Types.Decimal128, 
    set: v => { return new mongoose.Types.Decimal128.fromString(v.toFixed(2)); },
    required: true,
  },
  cardPostalCode: { type: String, maxlength: 100 },
  cardCountry: { type: String, maxlength: 100 },
  shippingAddress: {
    email: { type: String, maxlength: 100 },
    name: { type: String, maxlength: 100 },
    line1: { type: String, maxlength: 100 },
    line2: { type: String, maxlength: 100 },
    city: { type: String, maxlength: 100 },
    state: { type: String, maxlength: 100 },
    country: { type: String, maxlength: 100 },
    postalCode: { type: String, maxlength: 100 },
  },
  completed: { type: Boolean, required: true, default: false },
});

module.exports = {
  product: ProductSchema,
  order: OrderSchema
};
