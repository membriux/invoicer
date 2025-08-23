# invoicer-generator

Automatically generate your invoice each month and just worry about the hours! :)

<img src="https://user-images.githubusercontent.com/20372706/134823265-7a8df2ce-5d66-444a-b4c7-e54b2641d1b1.gif" width=750 alt="walkthrough">

## Setup

1. **Configure your invoice settings** through `config.js` 
2. **Set up Invoice Generation API Key**:
   - Get a free API key from [Invoice-Generator.com](https://invoice-generator.com)
   - Create a free account → Settings → API Keys → New API Key
   - Create a `.env` file in your project root:
     ```bash
     INVOICE_API_KEY=your_actual_api_key_here
     ```
3. Run locally :) `npm run dev` or `npm run start`

## Tech Stack 🍔

- Node/Express js (backend)
- [**Invoicer API**](https://invoice-generator.com/developers) – for generating API
- [Heroku](https://heroku.com) – deployment

## Contributing

Node/Express js is not my forte so I definitely didn't impelement professional standards so feel free to contribute by making pull requests!

