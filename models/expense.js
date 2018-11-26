const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Expense Schema
const ExpenseSchema = mongoose.Schema({

  
    ExpenseType: {
        type: String
        },
    Branchname: {
    type: String
    },
    Amount: {
    type: String
    },
    descripition: {
    type: String
    },
    date: {
    type: String
    }
  
  
});


const Expense = module.exports = mongoose.model('Expense', ExpenseSchema);
