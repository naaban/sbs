const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Category Schema
const StockSchema = mongoose.Schema({

  
  stockid : {
    type: String
  },
  model_name: {
    type: String
  },
 
  brand_name:{
    type: String
  },
  category_type:{
    type: String
  },
  product:{
    type: String
  },
  battery_no:{
    type: String
  },
  color:{
    type: String
  },
  quantity:{
    type: String
  },
  add_barcode:{
    type: String
  },
  imei1:{
    type: String
  },
  imei2:{
    type: String
  },
  dp:{
    type: String
  },
  lp:{
    type: String
  },
  sp:{
    type: String
  },
  cp:{
    type: String
  },
  stock_status:{
    type: String
  },
  gst:{
    type: String
  },
  branch:{
    type: String
  },
  add_date:{
    type: String
  },
  remarks:{
    type: String
  },

});

const Stock = module.exports = mongoose.model('Stock', StockSchema);

module.exports.getStockyById = function(id, callback){
    Stock.findById(id, callback);
}

module.exports.getStockByEmail = function(email, callback){
  const query = {email: email}
  Stock.findOne(query, callback);
}

module.exports.addStock = function(newStock, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newStock.password, salt, (err, hash) => {
      if(err) throw err;
      newStock.password = hash;
      newStock.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}