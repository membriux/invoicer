const https = require("https");
const fs = require("fs");
const invoice = require('./invoice')


let generateInvoice = function (invoice, filename, success, error) {
    var postData = JSON.stringify(invoice);
    
    // Get API key from environment variable
    const apiKey = process.env.INVOICE_API_KEY;
    if (!apiKey) {
        console.error('INVOICE_API_KEY environment variable is required');
        if (typeof error === 'function') {
            error('API key not configured. Please set INVOICE_API_KEY environment variable');
        }
        return;
    }
    
    var options = {
        hostname: "invoice-generator.com",
        port: 443,
        path: "/",
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };

    var file = fs.createWriteStream(filename);

    var req = https.request(options, function (res) {
        console.log('Invoice API Response Status:', res.statusCode);
        console.log('Invoice API Response Headers:', res.headers);
        
        if (res.statusCode !== 200) {
            let errorData = '';
            res.on('data', function (chunk) {
                errorData += chunk;
            });
            res.on('end', function () {
                console.error('Invoice API Error:', errorData);
                if (typeof error === 'function') {
                    error('API returned status ' + res.statusCode + ': ' + errorData);
                }
            });
            return;
        }
        
        res.on('data', function (chunk) {
            file.write(chunk);
        })
        .on('end', function () {
            file.end();
            console.log('Invoice PDF saved successfully to:', filename);

            if (typeof success === 'function') {
                success();
            }
        });
    });
    
    req.write(postData);
    req.end();

    if (typeof error === 'function') {
        req.on('error', error);
    }
}






module.exports = generateInvoice