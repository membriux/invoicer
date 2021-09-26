

let address = "NAME \Address Street\nCITY \n Zipcode"
// date when you started sending invoices, make sure to adjust so it aligns with your invoice cycle
let initialDate = "8/1/2021"

let companyOptions = {
    mlh: {
        header: 'COMPANY_NAME (i.e. TechPro Inc.',
        address: 'Major League Hacking PBC, Inc. \n149 East 23rd Street #438 \nNew York, NY 10159',
        rate: 20,
        task: 'Admissions Specialist (Evaluations, interviews, shadowing interviews/evaluations, application reviews, code reviews, training)'
    }

}

module.exports = { initialDate, address, companyOptions }

