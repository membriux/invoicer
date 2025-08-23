// =============================================================================
// INVOICE GENERATOR CONFIGURATION TEMPLATE
// =============================================================================
// 
// This file contains all the configuration needed to customize the invoice generator
// for your own business needs. Follow the examples below to add your companies.
//
// HOW TO USE:
// 1. Update the 'address' variable with YOUR business address
// 2. Add your companies to the 'companyOptions' object
// 3. Each company needs: header, address, rate, task, description, and initialDate
// 4. Save and restart your application
//
// =============================================================================

// YOUR BUSINESS ADDRESS (this will appear as the "from" address on invoices)
let address = "Your Business Name \n Your Street Address \n City, State ZIP"

// COMPANY CONFIGURATIONS
// Add each company you work for as a new entry in this object
let companyOptions = {
    // EXAMPLE COMPANY 1: Replace with your actual client
    client1: {
        header: 'Client Company Name',                              // Company name as it appears on invoice
        address: 'Client Street Address\nClient City, State ZIP',   // Company's billing address
        rate: 75,                                                   // Your hourly rate for this company
        task: 'Service Description',                                // Service description
        description: 'Detailed description of services provided',   // Detailed service description
        initialDate: '1/1/2025'                                    // Date you started working for this company (MM/DD/YYYY)
    },
    
    // EXAMPLE COMPANY 2: Replace with your actual client
    client2: {
        header: 'Another Client Company',                           // Company name as it appears on invoice
        address: 'Another Client Address\nClient City, State ZIP', // Company's billing address
        rate: 85,                                                   // Your hourly rate for this company
        task: 'Different Service',                                  // Service description
        description: 'Description of different services',           // Detailed service description
        initialDate: '3/15/2025'                                   // Date you started working for this company (MM/DD/YYYY)
    }
    
    // TO ADD MORE COMPANIES, copy the format above and add here:
    // 
    // newcompany: {
    //     header: 'Company Name',
    //     address: 'Company Address\nCity, State ZIP',
    //     rate: 80,                    // Your hourly rate
    //     task: 'Service Description',
    //     description: 'Detailed description of services',
    //     initialDate: 'MM/DD/YYYY'   // When you started working for them
    // }
}

// =============================================================================
// CONFIGURATION NOTES:
// =============================================================================
//
// RATE: Enter your hourly rate as a number (e.g., 65, 75, 100)
// TASK: Brief description of what you do (e.g., 'Web Development', 'Consulting')
// DESCRIPTION: More detailed description for the invoice
// INITIAL DATE: Use MM/DD/YYYY format (e.g., '1/15/2025')
//
// ADDRESS FORMATTING:
// - Use \n for line breaks in addresses
// - Example: '123 Main St\nCity, State ZIP'
//
// CYCLE CALCULATION:
// - The system automatically calculates invoice cycles based on your start date
// - Each company maintains its own independent cycle count
// - Switching companies automatically shows the appropriate cycle
//
// =============================================================================

module.exports = { address, companyOptions }

