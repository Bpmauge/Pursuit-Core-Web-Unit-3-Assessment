const express = require('express');
const app = express();
const port = 2591;

app.use(express.json());
app.use(express.urlencoded({
    extendedL: false
}));

const cors = require('cors');
app.use(cors());


const researcherRouter = require('./routes/researchers');
const speciesRouter = require('./routes/species');
const animalsRouter = require('./routes/animals');
const habitatsRouter = require('./routes/habitats');
const sightingsRouter = require('./routes/sightings');

app.use('/researchers', researcherRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalsRouter);
app.use('/habitats', habitatsRouter);
app.use('/sightings', sightingsRouter);


app.get('/', (req, res) => {
    res.send(`Welcome to the conservatory`);
});

app.use('*', (req, res) => {
    res.status(404).send(`Error: no such route found on Holding server. Try again.`);
});

app.listen(port, () => {
    console.log(`listening at port:${port}`)
});