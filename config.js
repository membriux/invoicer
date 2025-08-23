

let address = "Membriux Consulting \n 19647 Adair Dr\nCastro Valley \n CA 94546"
// date when you started sending invoices, make sure to adjust so it aligns with your invoice cycle
let initialDate = "8/22/2025"

let companyOptions = {
    codepath: {
        header: 'Codepath.org',
        address: '5214F Diamond Hts Blvd, Unit #1154  \nSan Francisco, CA 94131',
        rate: 65,
        task: 'Technical Career Coach',
        description: 'Technical Career Coaching Services',
        initialDate: '8/22/2025'
    },
    freelancer: {
        header: 'Freelance Client',
        address: '123 Business St\nSan Francisco, CA 94105',
        rate: 75,
        task: 'Web Development',
        description: 'Custom web development services',
        initialDate: '1/1/2025'
    }
}

module.exports = { initialDate, address, companyOptions }

