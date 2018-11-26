const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Admin = require('../models/admin');
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

// Register


  router.post('/adminregister', (req, res, next) => {

    let newAdmin = new Admin({

      id:req.body.id,
      name:req.body.name,
      email: req.body.email,
      password: req.body.password
      

    });
   
    Admin.addAdmin(newAdmin, (err, admin) => { 
      if(err){
        res.json({success: false , msg:'Failed to register Admin'});

        

      } else {
        res.json({success: true , msg:'Admin registered'});
    


      }
    });

  });



// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.getAdminByEmail(email, (err, admin) => {
    if(err) throw err;
    if(!admin){
      return res.json({success: false, msg: 'Admin not found'});
    }

    Admin.comparePassword(password, admin.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(admin.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          admin: {
            id: admin._id,
            email: admin.email,
         

          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.put('/adminregister/:id', (req, res,next) => {
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var newAdmin = {
      id:req.body.id,
      name:req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    Admin.findByIdAndUpdate(req.params.id, { $set: newAdmin }, { new: true }, (err, doc) => {
        if (!err)
        {
         //res.send(doc);
         res.json({success: true, msg:'successfully  Updated Admin'});
        }
        else
        {

          res.json({success: false, msg:'Failed to Update Admin'});

        }
    });
});



router.get('/adminregister', (req, res,next) => {
  Admin.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Admin."
        });
    });
});

router.delete('/adminregister/:id', (req, res,next) => {

  Admin.findByIdAndRemove(req.params.id)
   .then(admins => {
       if(!admins) {
           return res.status(404).send({
               message: " Admin not found with id " + req.params.id
           });
       }
       res.send({message: "Admin deleted successfully!"});
   }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "Admin not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Could not delete Admin with id " + req.params.id
       });
   });

});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({admin: req.admin});
});

module.exports = router;
