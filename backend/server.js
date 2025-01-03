const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const bodyParser = require('body-parser')


const app = express();
app.use(cors()); 
app.use(bodyParser.json()); 

const auth = new google.auth.GoogleAuth({
    keyFile: 'secrets.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({version: 'v4', auth});
// do I need to keep my spreadsheetID secret??
const spreadsheetId = '1MjRGjMnplZdXoGeeoouju9uwBjs5cdSY_J3jZJ_dVok';

app.post('/write-to-sheet', async (req, res) => {
    const { values } = req.body;
    try {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A1',
            valueInputOption: 'RAW',
            resource: { values },
        });
        res.status(200).send(response.data)
    } catch (error){
        console.error(error.message);
        res.status(500).send('Error writing to google sheets');
    }

});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
