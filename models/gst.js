const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// GSt Schema
const GstSchema = mongoose.Schema({

    GSTID : {
    type: String,
    required: true,
    unique: true
  },
    Percentage: {
    type: String
  }
 
});

const Gst = module.exports = mongoose.model('Gst', GstSchema);

module.exports.getGstById = function(id, callback){
    Gst.findById(id, callback);
}


