

let { address, companyOptions } = require('../config')

/**
 * Build invoice dictionary to pass on to API that will generate the invoice
 * @param {*} data  # data from config.js
 * @returns invoice dictionary for API  
 */

let createInvoice = function (data) {
   let company = companyOptions[data.company]

   let date = new Date(data.cycleEnd)
   date.setDate(date.getDate() + 1)
   let dueDate = new Date(date)
   dueDate.setDate(dueDate.getDate() + 25)

   date = date.toString().slice(0, 16)
   dueDate = dueDate.toString().slice(0, 16)
   return {
      // logo: "Guillermo Sanchez",
      header: company.header,
      from: address,
      date: date,
      due_date: dueDate,
      to: company.address,
      currency: "usd",
      number: data.cycle,
      items: [
         {
            name: `${company.task} (${data.cycleInit} to ${data.cycleEnd})`,
            quantity: data.hours,
            unit_cost: company.rate,
            description: company.description
         }
      ]
   };
}

const invoice =

   module.exports = createInvoice