const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nasa-api:FtTb0vCqbdhwy2KR@nasacluster.xnlan.mongodb.net/nasaDB?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(`Error: ${err}`);
});

async function connectToMongoDB() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    connectToMongoDB,
    mongoDisconnect
}