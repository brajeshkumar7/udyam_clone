const express = require('express');
const { validateAdhar_Pan } = require('./controllers/validate.controller');
const app = express();

app.use(express.json());

// Add your routes:
app.post('/validate', validateAdhar_Pan);
// ... other routes ...

module.exports = app; // <--- You must export the app itself
