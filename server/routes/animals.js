const express = require('express');
const router = express.Router();
// Database
const db = require('../db.js');

const getAllAnimals = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM animals JOIN species ON animals.species_id = species.id`
    let results = await db.any(selectQuery);
    res.status(200).json({
        status: 'success',
        message: 'retrieved all animals',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'no animals to be found',
            payload: null
        })
    }
}

const getSingleAnimal = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM animals WHERE id = $1`
    let results = await db.any(selectQuery, parseInt(req.params.id));
    res.status(200).json({
        status: 'success',
        message: 'retrieved single animal',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Animal not found',
            payload: null
        })
    }
}

const addNewAnimal = async (req, res) => {
    try{
    let insertQuery = `
    INSERT INTO animals(name, species_id, nickname) VALUES($1, $2, $3) `
    let results = await db.none(insertQuery, [req.body.name, req.body.job_title, req.body.nickname]);
    res.status(201).json({
        status: 'success',
        message: 'added new animal'
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Animal was not added',
            payload: null
        })
    }
}

const updateAnimal = async (req, res) => {
    try{
    let updateQuery = `
    UPDATE animals SET name = $1, species_id = $2, nickname = $3 WHERE id = $4`
    let results = await db.any(updateQuery, [req.body.name, req.body.species_id, req.body.nickname, parseInt(req.params.id)]);
    res.status(201).json({
        status: 'success',
        message: 'updated animal',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Animal was not updated',
            payload: null
        })
    }
}

const deleteAnimal = async (req, res) => {
    try{
    let deleteQuery = `
    DELETE FROM researchers WHERE id = $1`
    let results = await db.none(deleteQuery, parseInt(req.params.id));
    res.status(201).json({
        status: 'success',
        message: 'Deleted animal'
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Animal was not deleted',
            payload: null
        })
    }
}


router.get('/', getAllAnimals);
router.get('/:id', getSingleAnimal);
router.post('/', addNewAnimal);
router.patch('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

module.exports = router;