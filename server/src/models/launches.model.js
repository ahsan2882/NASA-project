const launches = new Map();

const launch = {
    flightNumber: 1,
    mission: 'Hubble',
    rocket: 'Rover',
    launchDate: new Date('April 1 2069'),
    destination: 'Moon',
    customers: ['NASA', 'NOAA', 'Elon Musk'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

module.exports = {
    launches
};