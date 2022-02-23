const launches = new Map();

const launch = {
    flightNumber: 1,
    mission: 'Hubble',
    rocket: 'Rover',
    launchDate: new Date('April 1 2069'),
    destination: 'Kepler-1652 b',
    customers: ['NASA', 'NOAA', 'Elon Musk'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

module.exports = {
    getAllLaunches
};