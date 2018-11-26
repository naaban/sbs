const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Service Schema
const SalereturnSchema = mongoose.Schema({

    VoucherID : {
    type: String
    },
    CustmerName: {
        type: String
       },
    CustmerContact: {
       type: String
       },
    Brandname : {
        type: String
        },
    Modelnum: {
    type: String
    },
    Purchasedate : {
        type: String
        },
    Returndate: {
     type: String
     },
     Description: {
        type: String
        },
    status: {
      type: String
      }
  
  
});


const Salereturn = module.exports = mongoose.model('Salereturn', SalereturnSchema);

module.exports.getSalereturnById = function(id, callback){
    Salereturn.findById(id, callback);
}

module.exports.getSalereturneByEmail = function(email, callback){
  const query = {email: email}
  Salereturn.findOne(query, callback);
}

module.exports.addSalereturn = function(newSalereturn, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newSalereturn.password, salt, (err, hash) => {
      if(err) throw err;
      newSalereturn.password = hash;
      newSalereturn.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
