var express = require('express');
var router = express.Router();
let generateInvoice = require('../invoice/invoice_api')
let createInvoice = require('../invoice/invoice')
let { initialDate, companyOptions } = require('../config')
var fs = require('fs');


router.get('/', function (req, res, next) {
  // Get the first company as default
  const companies = Object.keys(companyOptions);
  const defaultCompany = companies[0];
  
  res.render('index', {
    title: 'Invoice Generator',
    type: 'company-cycle',
    company: defaultCompany,
    companies: companyOptions,
    initDate: companyOptions[defaultCompany].initialDate
  })
})


router.post('/generate', function (req, res, next) {
  let filePath = "public/invoice.pdf";
  let data = req.body

  console.log(data)
  let invoice = createInvoice(data)
  generateInvoice(invoice, filePath, function () {
    console.log("Saved invoice to invoice.pdf");
    fs.readFile(filePath, function (err, data) {
      let newFileName = invoice.header + '#' + invoice.number + '.pdf'
      res.setHeader('Content-Length', filePath.length);
      res.download(filePath, newFileName)

      // res.contentType("application/pdf");
      // res.status(200).send(data);
    });

  }, function (error) {
    console.error("Error in generate:", error);
    res.status(500).send(error)
  });



})


module.exports = router;
