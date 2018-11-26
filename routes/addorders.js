const express = require('express');
const router = express.Router();
const Addorder = require('../models/addorder');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 
router.post('/addorder', (req, res,next) => {

    let newAddorder = new Addorder({
        
        invoice : req.body.invoice,
        custmername : req.body.custmername,
        custmeraddress : req.body.custmeraddress, 
        custmerphone : req.body.custmerphone,
        branchid : req.body.branchid,
        modelname : req.body.modelname, 
        brandname : req.body.brandname,
        BrandName : req.body.BrandName,
        imei : req.body.imei, 
        subtotal : req.body.subtotal,
        gst : req.body.gst,
        totalamount : req.body.totalamount,
        discount : req.body.discount, 
        grandtotal : req.body.grandtotal,
        paid : req.body.paid,
        due : req.body.due, 
        paymenttype : req.body.paymenttype,
        paymentstatus : req.body.paymentstatus
         
     });
    newAddorder.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Addorder registered'});
      }).catch(err => {
        res.json({success: false, msg:'Addorder registered Failed'});
      });

  });

  router.get('/addorder', (req, res,next) => {
    Addorder.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });

// Get by Id 

router.get('/addorder/:id', (req, res,next) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

      Addorder.findById(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retriving Brand :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;