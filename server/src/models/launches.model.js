const axios = require('axios');

const launchesDB = require('./launches.mongo');

const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 1;

const launch = {
    flightNumber: 1000, //flight_number
    mission: 'Hubble', //name
    rocket: 'Rover', //rocket.name
    launchDate: new Date('April 1, 2069'), //date_local
    target: 'Kepler-1652 b', //Not applicable
    customers: ['NASA', 'NOAA', 'Elon Musk'], //payloads.customers
    upcoming: true, //upcoming
    success: true //success
};

saveLaunch(launch);

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
    console.log('Downloading launch data');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });

    if (response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Unable to download launch data');
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const launchDocPayloads = launchDoc['payloads'];
        const customers = launchDocPayloads.flatMap((launchDocPayload) => {
            return launchDocPayload['customers'];
        });
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers
        };
        console.log(`${launch.flightNumber} ${launch.mission} with customers: ${launch.customers}`);
        await saveLaunch(launch);
    }
}

async function loadLaunchesData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission:'FalconSat'
    });
    if (firstLaunch) {
        console.log('Launch data already exists');
    } else {
        try {
            await populateLaunches()
        } catch (error) {
            console.log(error);
        };
    }

    

}

async function findLaunch(filter) {
    return await launchesDB.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({
        flightNumber: launchId,
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDB
        .findOne()
        .sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launchesDB.find({}, {
        '_id': 0,
        '__v': 0
    });
}

async function saveLaunch(launch) {
    
    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching target found');
    }
    const newFlightNum = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'NOAA', 'Elon Musk'],
        flightNumber: newFlightNum
    });
    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDB.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });
    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    loadLaunchesData
}; 