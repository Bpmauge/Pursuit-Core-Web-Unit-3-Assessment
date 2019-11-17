const express = require('express');
const cors = require('cors');
const app = express();
const port = 2591;

app.use(cors());

app.use(express.urlencoded({
    extendedL: false
}));

app.use(express.json());

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
    res.send(`welcome`);
});

app.listen(port, () => {
    console.log(`listening at port:${port}`)
})