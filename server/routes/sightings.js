const express = require('express');
const pgp = require('pg-promise')();
const connectionString = 'postgres://localhost:5432/marine_research_db';
const db = pgp(connectionString);
const router = express.Router();

const getAllSightings = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM sightings`
    let results = await db.any(selectQuery);
    res.status(200).json({
        status: 'success',
        message: 'retrieved all sightings',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'no sightings to be found',
            payload: null
        })
    }
}

const getSpeciesSightings = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM sightings WHERE species_id = $1`
    let results = await db.any(selectQuery, parseInt(req.params.species_id));
    res.status(200).json({
        status: 'success',
        message: 'retrieved all species sightings',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'No species sightings found',
            payload: null
        })
    }
}

const getResearcherSightings = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM sightings WHERE researcher_id = $1;`
    let results = await db.any(selectQuery, parseInt(req.params.researcher_id));
    res.status(200).json({
        status: 'success',
        message: 'retrieved all researcher sightings',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'No researcher sightings found',
            payload: null
        })
    }
}

const getHabitatSightings = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM sightings WHERE habitat_id = $1`
    let results = await db.any(selectQuery, parseInt(req.params.habitat_id));
    res.status(200).json({
        status: 'success',
        message: 'retrieved all habitat sightings',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'No habitat sightings found',
            payload: null
        })
    }
}

const addNewSighting = async (req, res) => {
    try{
    let insertQuery = `
    INSERT INTO sightings(species_id, researcher_id, habitat_id) VALUES($1, $2, $3) `
    let results = await db.none(insertQuery, [req.body.species_id, req.body.researcher_id, req.body.habitat_id]);
    res.status(201).json({
        status: 'success',
        message: 'added new sighting'
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Sighting was not added',
            payload: null
        })
    }
}

const deleteSighting = async (req, res) => {
    try{
    let deleteQuery = `
    DELETE FROM sightings WHERE id = $1`
    let results = await db.none(deleteQuery, parseInt(req.params.id));
    res.status(201).json({
        status: 'success',
        message: 'Deleted sighting'
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Sighting was not deleted',
            payload: null
        })
    }
}


router.get('/', getAllSightings);
router.get('/species/:species_id', getSpeciesSightings);
router.get('/researchers/:researcher_id', getResearcherSightings);
router.get('/habitats/:habitat_id', getHabitatSightings);
router.post('/', addNewSighting);
router.delete('/:id', deleteSighting);

module.exports = router;