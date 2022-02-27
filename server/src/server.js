const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model');

const PORT = Number(process.env.PORT) || 8000;
// FtTb0vCqbdhwy2KR
// nasa-api


const MONGO_URL = 'mongodb+srv://nasa-api:FtTb0vCqbdhwy2KR@nasacluster.xnlan.mongodb.net/nasaDB?retryWrites=true&w=majority'
const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(`Error: ${err}`);
});

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}
startServer();

