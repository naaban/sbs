const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Addorder Schema
const AddorderSchema = mongoose.Schema({


  invoice: {
    type: String
  },
  custmername: {
    type: String
  },
  custmeraddress: {
    type: String,
  },
  custmerphone: {
    type: String,
  },
 
  branchid: {
    type: String
  },
  modelname: {
    type: String
  },
  brandname: {
    type: String
  },
  imei: {
    type: String
  },
  subtotal: {
    type: String
  },
  gst: {
    type: String
  },
  totalamount: {
    type: String
  },
  discount: {
    type: String
  },
  grandtotal: {
    type: String
  },
  paid: {
    type: String
  },
  due: {
    type: String
  },
  paymenttype: {
    type: String
  },
  paymentstatus: {
    type: String
  },
  
});

const Addorder = module.exports = mongoose.model('Addorder', AddorderSchema);

module.exports.getAddorderById = function(id, callback){
  Addorder.findById(id, callback);
}



