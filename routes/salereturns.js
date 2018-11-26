const express = require('express');
const router = express.Router();
const Salereturn = require('../models/salereturn');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/salereturn', (req, res,next) => {

    let newSalereturn = new Salereturn({
     
        VoucherID : req.body.VoucherID,
        CustmerName : req.body.CustmerName,
        CustmerContact : req.body.CustmerContact,
        Brandname : req.body.Brandname,
        Modelnum : req.body.Modelnum,
        Purchasedate:req.body.Purchasedate,
        Returndate : req.body.Returndate,
        Description : req.body.Description,
        status : req.body.status
  
     });
    newSalereturn.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Salereturn registered'});
      }).catch(err => {
        res.json({success: false, msg:'Salereturn registered Failed'});
      });

  });

  router.get('/salereturn', (req, res,next) => {
    Salereturn.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Admin."
        });
    });
});


// Delete
  router.delete('/salereturn/:id', (req, res,next) => {

    Salereturn.findByIdAndRemove(req.params.id)
      .then(salereturns => {
          if(!salereturns) {
              return res.status(404).send({
                  message: " Salereturn not found with id " + req.params.id
              });
          }
          res.send({message: "Salereturn deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Salereturn not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Salereturn with id " + req.params.id
          });
      });

  });

  // Update

  router.put('/salereturn/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

      var newSalereturn = {
        VoucherID : req.body.VoucherID,
        CustmerName : req.body.CustmerName,
        CustmerContact : req.body.CustmerContact,
        Brandname : req.body.Brandname,
        Modelnum : req.body.Modelnum,
        Purchasedate : req.body.Purchasedate,
        Returndate : req.body.Returndate,
        Description : req.body.Description,
        status : req.body.status
      };
      Salereturn.findByIdAndUpdate(req.params._id, { $set: newSalereturn }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Salesreturn'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Salereturn'});

          }
      });
  });

// //   // Profile
// router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//     res.json({salereturn: req.salereturn});
//   });
  
  module.exports = router;