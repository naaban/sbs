const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/stock', (req, res,next) => {

    let newStock = new Stock({
     
stockid:req.body.stockid,
model_name:req.body.model_name,
brand_name:req.body.brand_name,
category_type:req.body.category_type,
product:req.body.product,
battery_no:req.body.battery_no,
color:req.body.color,
quantity:req.body.quantity,
add_barcode:req.body.add_barcode,
imei1:req.body.imei1,
imei2:req.body.imei2,
dp:req.body.dp,
lp:req.body.lp,
sp:req.body.sp,
cp:req.body.cp,
stock_status:req.body.stock_status,
gst:req.body.gst,
branch:req.body.branch,
add_date:req.body.add_date,
remarks:req.body.remarks
        
// req.body.CategoryID,
 //req.body.Date    
     });
    newStock.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Stock registered'});
      }).catch(err => {
        res.json({success: false, msg:'Stock registered Failed'});
      });

  });

  // Get all data

  router.get('/stock', (req, res,next) => {
    Stock.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });

// Delete
  router.delete('/stock/:id', (req, res,next) => {

    Stock.findByIdAndRemove(req.params.id)
      .then(stocks => {
          if(!stocks) {
              return res.status(404).send({
                  message: " Stock not found with id " + req.params.id
              });
          }
          res.send({message: "Stock deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Category not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Category with id " + req.params.id
          });
      });

  });

   // Update

   router.put('/stock/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

      var newStock = {
        stockid:req.body.stockid,
model_name:req.body.model_name,
brand_name:req.body.brand_name,
category_type:req.body.category_type,
product:req.body.product,
battery_no:req.body.battery_no,
color:req.body.color,
quantity:req.body.quantity,
add_barcode:req.body.add_barcode,
imei1:req.body.imei1,
imei2:req.body.imei2,
dp:req.body.dp,
lp:req.body.lp,
sp:req.body.sp,
cp:req.body.cp,
stock_status:req.body.stock_status,
gst:req.body.gst,
branch:req.body.branch,
add_date:req.body.add_date,
remarks:req.body.remarks
      };
      Stock.findByIdAndUpdate(req.params._id, { $set: newStock }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Stock'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Stock'});

          }
      });
  });

  // Get by Id 

  router.get('/stock/:stockid', (req, res,next) => {
        Stock.find({stockid :{ $eq : req.params.stockid}}, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Branch :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;