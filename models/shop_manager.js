const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const ShopmanagerSchema = mongoose.Schema({

    id: {
        type: String,
        required: true,
        unique: true

    },
    usertype: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    emptype: {
        type: String
    },
    dob:{
        type:String
    },
    age: {
        type: String
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
   
    address: {
        type: String
    },
    pancard: {
        type: String
    },
    aadhaarcard: {
        type: String
    },
    driving_license:{
        type: String
    },
    doj:{
        type: String
    },
    previous_employment:{
        type: String
    },
    previous_employment_address:{
        type: String
    },
    previous_employment_mobile:{
        type: String
    },
    branchid:{
        type: String
    },
    shopownerid:{
        type: String
    }
    

});

const Shopmanager = module.exports = mongoose.model('Shopmanager', ShopmanagerSchema);

module.exports.getShopmanagerById = function(id, callback){
    Shopmanager.findById(id, callback);
}

module.exports.getShopmanagerByEmail = function(email, callback){
  const query = {email: email}
  Shopmanager.findOne(query, callback);
}

module.exports.addShopmanager = function(newShopmanager, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newShopmanager.password, salt, (err, hash) => {
      if(err) throw err;
      newShopmanager.password = hash;
      newShopmanager.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
