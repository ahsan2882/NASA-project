const http = require('http');

require('dotenv').config();

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');
const { connectToMongoDB } = require('./services/mongo');

const PORT = Number(process.env.PORT) || 8000;
// FtTb0vCqbdhwy2KR
// nasa-api



const server = http.createServer(app);



async function startServer() {
    await connectToMongoDB();
    await loadPlanetsData();
    await loadLaunchesData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}
startServer();

