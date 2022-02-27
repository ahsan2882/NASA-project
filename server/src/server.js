const http = require('http');
const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model');
const { connectToMongoDB } = require('./services/mongo');

const PORT = Number(process.env.PORT) || 8000;
// FtTb0vCqbdhwy2KR
// nasa-api



const server = http.createServer(app);



async function startServer() {
    await connectToMongoDB();
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}
startServer();

