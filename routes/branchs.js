const express = require('express');
const router = express.Router();
const Branch = require('../models/branch');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 
  router.post('/branch',(req,res,next) => {

    let newBranch = new Branch({
    branchid:req.body.branchid,
    bname : req.body.bname,
    sname : req.body.sname,
    address : req.body.address,
    gst_num : req.body.gst_num,
    shop_logo : req.body.shop_logo,
    pan_num : req.body.pan_num,
    phone1 : req.body.phone1,
    phone2 : req.body.phone2,
    email1 : req.body.email1,
    email2 : req.body.email2,
    shop_num : req.body.shop_num,
    owner_id : req.body.owner_id
     });
    newBranch.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Branch registered'});
      }).catch(err => {
        res.json({success: false, msg:'Branch registered Failed'});
      });

  });


  // Get all data

  router.get('/branch', (req, res,next) => {
    Branch.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });


//// Delete
  router.delete('/branch/:id', (req, res,next) => {

    Branch.findByIdAndRemove(req.params.id)
      .then(branchs => {
          if(!branchs) {
              return res.status(404).send({
                  message: " Branch not found with id " + req.params.id
              });
          }
          res.send({message: "Branch deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Branch not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Branch with id " + req.params.id
          });
      });

  });

  
  router.put('/branch/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

          var newBranch = {
            branchid:req.body.branchid,
            bname : req.body.bname,
            sname : req.body.sname,
            address : req.body.address,
            gst_num : req.body.gst_num,
            shop_logo : req.body.shop_logo,
            pan_num : req.body.pan_num,
            phone1 : req.body.phone1,
            phone2 : req.body.phone2,
            email1 : req.body.email1,
            email2 : req.body.email2,
            shop_num : req.body.shop_num,
            owner_id : req.body.owner_id
      };
      Branch.findByIdAndUpdate(req.params._id, { $set: newBranch }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Branch'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Branch'});

          }
      });
  });
  // Get by Id 

  router.get('/branch/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Branch.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Branch :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;