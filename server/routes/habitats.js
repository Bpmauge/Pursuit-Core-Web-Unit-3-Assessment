const express = require('express');
const router = express.Router();
// Database
const db = require('../db.js');

const getAllHabitats = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM habitats;`
    let results = await db.any(selectQuery);
    res.status(200).json({
        status: 'success',
        message: 'retrieved all habitats',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'no habitats to be found',
            payload: null
        })
    }
}

const getSingleHabitat = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM habitats WHERE id = $1`
    let results = await db.any(selectQuery, parseInt(req.params.id));
    res.status(200).json({
        status: 'success',
        message: 'Retrieved single habitat',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'No habitat to be found',
            payload: null
        })
    }
}

const addNewHabitat = async (req, res) => {
    try{
    let insertQuery = `
    INSERT INTO habitats(category) VALUES($1) `
    let results = await db.none(insertQuery, req.body.category);
    res.status(201).json({
        status: 'success',
        message: 'Added new habitat'
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Habitat was not added',
            payload: null
        })
    }
}


router.get('/', getAllHabitats);
router.get('/:id', getSingleHabitat);
router.post('/', addNewHabitat);


module.exports = router;