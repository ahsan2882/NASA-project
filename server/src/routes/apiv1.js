const express = require('express');

const apiv1Router = express.Router();

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

apiv1Router.use('/planets', planetsRouter);
apiv1Router.use('/launches', launchesRouter);

module.exports = apiv1Router;