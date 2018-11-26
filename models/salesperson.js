const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const SalespersonSchema = mongoose.Schema({

    id:{
        type:String
    },
    
    firstname: {
        type: String
    },
    lastname:{
        type: String
    },
    emp_type:{
        type: String
    },
    dob:{
        type:String
    },
    age:{
        type:String
    },
    phone: {
        type: String,
    },
   
    email: {
        type: String
    },
    password: {
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

const Salesperson = module.exports = mongoose.model('Salesperson', SalespersonSchema);

module.exports.getSalespersonById = function(id, callback){
    Salesperson1.findById(id, callback);
}

module.exports.getSalespersonByEmail = function(email, callback){
  const query = {email: email}
  Salesperson.findOne(query, callback);
}

module.exports.addSalesperson = function(newSalesperson, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newSalesperson.password, salt, (err, hash) => {
      if(err) throw err;
      newSalesperson.password = hash;
      newSalesperson.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
