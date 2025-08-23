

let address = "Membriux Consulting \n 19647 Adair Dr\nCastro Valley \n CA 94546"
// date when you started sending invoices, make sure to adjust so it aligns with your invoice cycle
let initialDate = "8/22/2025"

let companyOptions = {
    codepath: {
        header: 'Codepath.org',
        address: '5214F Diamond Hts Blvd, Unit #1154  \nSan Francisco, CA 94131',
        rate: 65,
        task: 'Technical Career Coach'
    }

}

module.exports = { initialDate, address, companyOptions }

