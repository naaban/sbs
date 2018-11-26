const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Branch Schema
const BranchSchema = mongoose.Schema({

  branchid: {
    type: String,
    required: true,
    unique: true
  },
  bname: {
    type: String
  },
  sname: {
    type: String
  },
  address: {
    type: String
  },
  gst_num: {
    type: String
  },
  shop_logo: {
    type: String
  },
  pan_num: {
    type: String
  },
  phone1: {
    type: String
  },
  phone2: {
    type: String
  },
  email1: {
    type: String
  },
  email2: {
    type: String
  },
  
  shop_num: {
    type: String
  },
  owner_id: {
    type: String
  },
  
});

const Branch = module.exports = mongoose.model('Branch', BranchSchema);

module.exports.getBranchById = function(id, callback){
    Branch.findById(id, callback);
}

module.exports.getBranchByEmail = function(email, callback){
  const query = {email: email}
  Branch.findOne(query, callback);
}

module.exports.addBranch = function(newBranch, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newBranch.password, salt, (err, hash) => {
      if(err) throw err;
      newBranch.password = hash;
      newBranch.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
