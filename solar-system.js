// 1. Mongoose requirements
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/solarSystemDB', {useMongoClient: true});

// 2. Creating schemas
var Schema = mongoose.Schema;

var SolarSystemSchema = new Schema({
    planets: [{ type: Schema.Types.ObjectId, ref: 'planet' }],
    starName: String
});

var PlanetSchema = new Schema({
    name: String,
    system: { type: Schema.Types.ObjectId, ref: 'solarSystem' },
    visitors: [{ type: Schema.Types.ObjectId, ref: 'visitor' }]
});

var VisitorSchema = new Schema({
    name: String,
    homePlanet: { type: Schema.Types.ObjectId, ref: 'planet' },
    visitedPlanets: [{ type: Schema.Types.ObjectId, ref: 'planet' }]
});

// 3. Creating models
var SolarSystem = mongoose.model('solarSystem', SolarSystemSchema);
var Planet = mongoose.model('planet', PlanetSchema);
var Visitor = mongoose.model('visitor', VisitorSchema);

// 4. Creating instances and saving them
// var ourSystem = new SolarSystem({
//     planets:[],
//     starName: "Sun"
// });

// var earth = new Planet({
//     name: "Earth",
//     system: ourSystem._id,
//     visitors: []
// });

// var mars = new Planet({
//     name: "Mars",
//     system: ourSystem._id,
//     visitors: []
// });

// var et = new Visitor({
//     name: "ET",
//     homePlanet: mars._id,
//     visitedPlanets: []
// });

// var moshe = new Visitor({
//     name: "Moshe",
//     homePlanet: earth._id,
//     visitedPlanets: []
// })

// et.visitedPlanets.push(earth);
// et.save();
// moshe.visitedPlanets.push(mars);
// moshe.save();
// ourSystem.planets.push(earth);
// ourSystem.planets.push(mars);
// ourSystem.save();
// mars.visitors.push(moshe);
// earth.visitors.push(et);
// mars.save();
// earth.save();

// 5. Queries
// Find a visitor's list of visited planets
// Visitor.findOne({ name: "ET" }).populate('visitedPlanets').exec(function(err, visitor) {
//     console.log(visitor);
// });

// Find all the visitors on a planet
// Planet.findOne({ name: "Earth" }).populate('visitors', 'name -_id').exec(function (err, planet) {
//     console.log(planet.visitors);
// });

// Find all the visitors in a system (sub-documents!)
// SolarSystem.findOne({ starName: "Sun" }).populate({
//     path: 'planets',
//     populate: {
//         path: 'visitors'
//     }
// }).exec(function (err, solarSystem) {
//     console.log(err);
//     for (let i=0; i < solarSystem.planets.length; i++) {
//         console.log(solarSystem.planets[i].visitors);
//     }
// });

// Find the name of the star in the system of a visitor's home planet
// Visitor.findOne({ name: "ET" }).populate({
//     path: 'homePlanet',
//     populate: {
//         path: 'system'
//     }
// }).exec(function(err, visitor) {
//     console.log(err);
//     console.log(visitor.homePlanet.system);
// });

// Find a planet's system's star name as well as its visitors
Planet.findOne({ name: "Earth" }).populate('system visitors').exec(function(err, planet) {
    console.log(planet.system.starName);
    console.log(planet.visitors);
});