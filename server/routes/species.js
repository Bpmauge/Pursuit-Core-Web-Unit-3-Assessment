const express = require('express');
const router = express.Router();
// Database
const db = require('../db.js');

const getAllSpecies = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM species`
    let results = await db.any(selectQuery);
    res.status(200).json({
        status: 'success',
        message: 'retrieved all species',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'no species to be found',
            payload: null
        })
    }
}

const getSingleSpecies = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM species WHERE id = $1`
    let results = await db.any(selectQuery, parseInt(req.params.id));
    res.status(200).json({
        status: 'success',
        message: 'Retrieved single species',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'No species to be found',
            payload: null
        })
    }
}

const addNewSpecies = async (req, res) => {
    try{
    let insertQuery = `
    INSERT INTO species(name, is_mammal) VALUES($1, $2) `
    let results = await db.none(insertQuery, [req.body.name, req.body.is_mammal]);
    res.status(201).json({
        status: 'success',
        message: 'Added new species'
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Species was not added',
            payload: null
        })
    }
}


router.get('/', getAllSpecies);
router.get('/:id', getSingleSpecies);
router.post('/', addNewSpecies);


module.exports = router;