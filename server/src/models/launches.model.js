const launches = new Map();

let latestFlightNumber = 1;

const launch = {
    flightNumber: 1,
    mission: 'Hubble',
    rocket: 'Rover',
    launchDate: new Date('April 1, 2069'),
    target: 'Kepler-1652 b',
    customers: ['NASA', 'NOAA', 'Elon Musk'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launchObj) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launchObj, {
            customers: ['NASA', 'NOAA', 'Elon Musk'],
            flightNumber: latestFlightNumber,
            upcoming: true,
            success: true
        }));
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
};