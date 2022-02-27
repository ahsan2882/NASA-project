const path = require('path');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const apiv1Router = require('./routes/apiv1');

const app = express();

app.use(morgan('combined'));

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))

// v1 API
app.use('/v1', apiv1Router);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;